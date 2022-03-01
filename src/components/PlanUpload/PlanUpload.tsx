/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled } from '@mui/material/styles';
import { proxy, subscribe, useSnapshot } from 'valtio';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import screenStore, { storeActions as screenActions } from '@/store/screen';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
// import { Storage } from 'aws-amplify';
import { storeActions as unrealMqActions } from '@/store/unreal_mq';
import { useMutation, gql } from '@apollo/client';
import devStore, { storeActions as devActions } from '@/store/dev';

import * as pdfjsLib from 'pdfjs-dist';
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
pdfjsLib.GlobalWorkerOptions.workerSrc =
  '//cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/build/pdf.worker.js';

const Input = styled('input')({
  display: 'none',
});

interface PageProps {
  id: string;
  fullres: string;
  thumbnail: string;
  loading: boolean;
  url?: string;
  selected?: boolean;
  source?: object;
}

const M_INSERT_PLANS = gql`
  mutation ($objects: [plans_insert_input!]!) {
    insert_plans(objects: $objects) {
      returning {
        id
        fullres
        thumbnail
        sort
        scale
        location
      }
    }
  }
`;

export default function PlanUpload(props: { project_id: any }) {
  const screenState = useSnapshot(screenStore);
  const [plans, setPlans] = useState([]);
  const [plansPages, setPlansPages] = useState<PageProps[]>([]);
  const [loading, setLoading] = useState<any[]>([]);
  const project_id = props.project_id;

  const [importPages, setImportPages] = useState<PageProps[]>([]);
  const [insert_plans, insert_plans_response] = useMutation(M_INSERT_PLANS);

  interface stateType {
    messages: any;
    bar: any;
  }

  const testState: stateType = proxy({
    messages: [],
    bar: 0,
  });

  subscribe(testState, () => console.log('state.obj has changed to', testState));

  const changes = [];

  const handleOpen = () => {
    screenActions.open_upload();
  };

  const handleClose = () => {
    screenActions.close_upload();
  };

  const handleClearPages = () => {
    setPlansPages([]);
  };

  const handleDelete = (e: any) => {
    console.log(e.target.id);
    const test = plansPages.filter((obj) => `img-${obj.id}` !== e.target.id);
    console.log(test);
    setPlansPages(test);
  };

  const handleSelect = (e: any) => {
    console.log(e.target.id);
    setPlansPages((og: any[]) =>
      og.map((item) =>
        `img-${item.id}` === e.target.id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleImportPages = async () => {
    console.log('ImportPages Clicked');
    console.log(plansPages);
    const selectedPages = plansPages.filter((obj) => obj.selected === true);
    const uploadPages = selectedPages.map((item) => ({
      id: item.id,
      fullres: item.fullres,
      project_id: project_id,
      thumbnail: item.thumbnail,
      sort: 0,
      scale: null,
      calibration: null,
      location: { x: null, y: null },
      source: item.source || null,
    }));

    // console.log('eeee', 'awaiting', uploadPages);
    await insert_plans({ variables: { objects: uploadPages } });
    // console.log('eeee', insert_plans_response);

    const data = {
      type: 'load_pdf_plans',
      msg: {
        plans: uploadPages,
      },
    };

    // const type = 50;
    // const descriptorAsString = JSON.stringify(data);
    // const Data = new DataView(new ArrayBuffer(1 + 2 + 2 * descriptorAsString.length));
    // let byteIdx = 0;
    // Data.setUint8(byteIdx, type);
    // byteIdx++;
    // Data.setUint16(byteIdx, descriptorAsString.length, true);
    // byteIdx += 2;
    // for (let i = 0; i < descriptorAsString.length; i++) {
    // 	Data.setUint16(byteIdx, descriptorAsString.charCodeAt(i), true);
    // 	byteIdx += 2;
    // }
    // console.log(Data.buffer);

    unrealMqActions.send(data.type, data.msg);
    screenActions.close_upload();
    setPlansPages([]);
  };

  function dataURItoBlob(dataURI: any) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }

  const uploadImage = (event: any, project_id: string) => {
    //console.log(event.target.files);

    const newFiles: any[any] = [];
    Array.from(event.target.files).forEach((file: any) => {
      newFiles.push({
        id: uuidv4(),
        name: file.name,
        size: file.size,
      });

      const fileReader = new FileReader();

      fileReader.onload = function () {
        //Step 4:turn array buffer into typed array
        // @ts-ignore
        const typedarray = new Uint8Array(this.result);

        //Step 5:pdfjs should be able to read this
        const loadingTask = pdfjsLib.getDocument(typedarray);
        loadingTask.promise.then((pdf) => {
          // The document is loaded here...
          console.log(pdf.numPages);

          for (let i = 1; i <= pdf.numPages; i++) {
            pdf.getPage(i).then(async function (page) {
              //console.log('Page loaded');

              const page_id = uuidv4();
              const page_data = { id: page_id, loading: true };
              setPlansPages((old: any[]) => [...old, page_data]);
              setLoading((old: any[]) => [...old, page_id]);

              let scale = 1;
              let viewport = page.getViewport({ scale: scale });

              const og_height = viewport.height;
              const og_width = viewport.width;

              // rescale to max width
              scale = 2500 / viewport.width;
              viewport = page.getViewport({ scale: scale });

              const source_data = {
                filetype: 'pdf',
                pixels: { height: og_height, width: og_width },
              };

              console.log(scale);
              console.log(viewport);

              // var divpdf = document.createElement('div');
              // divpdf.className = 'pdf-loading';
              // divpdf.id = page_id;
              // divpdf.setAttribute('data-loading', true);

              // Prepare canvas using PDF page dimensions
              // var canv = document.createElement('canvas');
              // canv.id = 'c' + page_id;
              // canv.className = 'pdf';
              // divpdf.appendChild(canv);
              // document.getElementById('the-canvas-holder').appendChild(divpdf);

              // var canv = document.getElementById(page_id);
              const canv = document.createElement('canvas');
              const imggg = document.getElementById(`img-${page_id}`);
              const canvgg = document.getElementById(page_id);
              canv.id = `canv-${page_id}`;
              // @ts-ignore
              const context = canv.getContext('2d');
              // @ts-ignore
              canv.height = viewport.height;
              // @ts-ignore
              canvgg.height = viewport.height;
              // @ts-ignore
              canv.width = viewport.width;
              // @ts-ignore
              canvgg.width = viewport.width;

              console.log(viewport.height);

              // Render PDF page into canvas context
              const renderContext = {
                canvasContext: context,
                viewport: viewport,
              };

              // @ts-ignore
              const renderTask = page.render(renderContext);
              await renderTask.promise.then(async function (e) {
                const resizedCanvas = document.createElement('canvas');
                const resizedContext = resizedCanvas.getContext('2d');
                const thumb_height = canv.height / 10;
                const thumb_width = canv.width / 10;
                resizedCanvas.height = thumb_height;
                resizedCanvas.width = thumb_width;
                // @ts-ignore
                resizedContext.drawImage(canv, 0, 0, thumb_width, thumb_height);
                // console.log(e);
                // @ts-ignore
                const fullresData = canv.toDataURL('image/png');
                const fullresBlob = dataURItoBlob(fullresData);
                // @ts-ignore
                const thumbData = resizedCanvas.toDataURL('image/png');
                const thumbBlob = dataURItoBlob(thumbData);

                let thumb_url: any;
                let fullres_url: any;

                console.log('SAVING');
                try {
                  const presign_thumb = await fetch(
                    'https://hl7uh8lrxe.execute-api.us-east-1.amazonaws.com/staging/fn/planset/presign',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ filename: `${project_id}/${page_id}_thumbnail.png` }),
                    }
                  );
                  const presign_thumb_data = await presign_thumb.json();

                  const upload_thumb = await fetch(presign_thumb_data.url, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'image/png',
                    },
                    body: thumbBlob,
                  });

                  const presign_fullres = await fetch(
                    'https://hl7uh8lrxe.execute-api.us-east-1.amazonaws.com/staging/fn/planset/presign',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ filename: `${project_id}/${page_id}_fullres.png` }),
                    }
                  );
                  const presign_fullres_data = await presign_fullres.json();

                  const upload_fullres = await fetch(presign_fullres_data.url, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'image/png',
                    },
                    body: fullresBlob,
                  });

                  thumb_url = presign_thumb_data.url.split('?')[0];
                  fullres_url = presign_fullres_data.url.split('?')[0];

                  console.log(thumb_url);
                } catch (error) {
                  console.log(error);
                }

                // const result = await Storage.put(`alpha/pdf/${page_id}.png`, blobData, {
                // 	level: 'public',
                // 	contentType: 'image/png'
                // });

                // console.log(result);

                console.log('SIGNING URL');
                // const signedURL = await Storage.get(result.key);
                // const unsignedURL = signedURL.split('?')[0];
                // console.log('DONE');
                // console.log(signedURL);
                // console.log(unsignedURL);

                imggg?.setAttribute('src', thumbData);
                // @ts-ignore
                // canvgg?.style.display = 'none';
                // @ts-ignore
                imggg?.style.display = 'inline-flex';
                // console.log(plansPages);
                // page_data.loading = false;
                setPlansPages((og: any[]) =>
                  og.map((item) =>
                    item.id === page_id
                      ? {
                          id: item.id,
                          fullres: fullres_url,
                          thumbnail: thumb_url,
                          selected: false,
                          source: source_data,
                        }
                      : item
                  )
                );
                setLoading((og: any[]) => og.filter((item) => item !== page_id));

                // const newset = plansPages.map((item) => (item.id === page_id ? { ...item, loading: false } : item));
                // console.log(newset);
                // setPlansPages([...plansPages]);
                // setPlansPages(plansPages.map((item) => (item.id === new_page ? { ...item, loading: false } : item)));
                // console.log(`Page rendered: ${page_id}`);
              });
            });
          }
        });
      };
      fileReader.readAsArrayBuffer(file);

      setPlans(newFiles);
    });

    event.target.value = null;
  };

  return (
    <React.Fragment>
      {/* <Button variant='outlined' onClick={handleOpen}>
				Open max-width dialog
			</Button> */}
      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={screenState.upload_modal}
        onClose={handleClose}
        container={() => document.getElementsByClassName('fullscreen')[0]}
        keepMounted
      >
        <DialogTitle sx={{ boxShadow: '0 0 10px -6px #000' }}>
          <div>
            <Box>Plan Pages</Box>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ display: 'none' }}>
              <label htmlFor="contained-button-file">
                <Input
                  accept="application/pdf"
                  id="contained-button-file"
                  multiple
                  type="file"
                  data-project={project_id}
                  onChange={(e) => uploadImage(e, project_id)}
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
              <label htmlFor="icon-button-file">
                <Input accept="application/pdf, image/*" id="icon-button-file" type="file" />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </Stack>
          </div>
        </DialogTitle>
        <DialogContent
          className="minimal-scroll"
          sx={{ mr: '4px', maxHeight: '50vh', mt: '2px', mb: '2px', pr: '14px' }}
        >
          <div>
            {plansPages.length > 0 ? (
              <Box
                sx={{
                  pt: '10px',
                  pb: '10px',
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'end',
                  flexWrap: 'wrap',
                }}
              >
                {plansPages.map((page: any) => (
                  <Box
                    className={`pdf-thumbnail ${page.selected ? 'selected' : ''}`}
                    key={page.id}
                    onClick={handleSelect}
                  >
                    {page.loading ? (
                      <Box className="pdf-loader">
                        <CircularProgress
                          disableShrink
                          variant="indeterminate"
                          size={40}
                          thickness={3}
                        />
                      </Box>
                    ) : (
                      ''
                    )}
                    <img
                      className={`pdf ${page.selected ? 'selected' : ''}`}
                      id={`img-${page.id}`}
                      style={{ display: 'none' }}
                      alt={page.id}
                    />
                    <canvas id={page.id} className="pdf" />
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  pt: '45px',
                  pb: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ p: 2 }}>Upload PDF Documents to Create Floor Plans</Box>
                <div>
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="application/pdf, image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={(e) => uploadImage(e, project_id)}
                    />
                    <Button variant="outlined" component="span">
                      Select Files
                    </Button>
                  </label>
                </div>
              </Box>
            )}
          </div>
        </DialogContent>
        <DialogActions sx={{ boxShadow: '0 0 10px -6px #000', p: 2 }}>
          <div>
            {plansPages.length > 0 ? (
              <Button onClick={handleClearPages} sx={{ marginRight: '10px' }}>
                Remove Pages
              </Button>
            ) : (
              ''
            )}
            <Button onClick={handleClose} sx={{ marginRight: '10px' }}>
              Close
            </Button>

            {plansPages.reduce((acc, cur) => (cur.selected === true ? ++acc : acc), 0) > 0 ? (
              <Button variant="contained" onClick={handleImportPages}>
                Import Pages
              </Button>
            ) : (
              <Button variant="contained" disabled={true}>
                {loading.length > 0 ? `Loading Pages (${loading.length})` : 'Select Pages'}
              </Button>
            )}
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

{
  /* <Box className={`pdf-loading ${page.loading ? ' loader' : ''}`} key={page.id}></Box> */
}
