import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// next
import Link from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Paper,
  Button,
} from '@mui/material';
// utils
import { fToNowStrict } from '@/utils/formatTime';
// layouts
import Layout from '../../layouts';
// components
import Page from '@/components/Page';
import Label from '@/components/Label';
import Image from '@/components/Image';
import Scrollbar from '@/components/Scrollbar';
import SearchNotFound from '@/components/SearchNotFound';
// import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
// sections
import {
  ProductMoreMenu,
  ProductListHead,
  ProductListToolbar,
} from '@/sections/e-commerce/product-list';

import {
  useListProjectsQuery,
  Projects,
  useSoftDeleteProjectMutation,
  useInsertProjectMutation,
} from '@/graphql';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Project', alignRight: false, sortable: true },
  { id: 'updated_at', label: 'Last Edited', alignRight: false, sortable: true },
  { id: 'status', label: 'Status', alignRight: false, sortable: false },
  { id: 'owner.fist_name', label: 'Owner', alignRight: false, sortable: false },
  { id: '', label: 'Tools', alignRight: true, sortable: false },
];

// ----------------------------------------------------------------------

EcommerceProductList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductList() {
  const theme = useTheme();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);

  const [productList, setProductList] = useState<Projects[]>([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const [selected, setSelected] = useState<string[]>([]);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(9999);

  const [orderBy, setOrderBy] = useState('updated_at');

  const { data, loading, refetch } = useListProjectsQuery({
    fetchPolicy: 'cache-and-network',
    pollInterval: 60 * 1000,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [softDeleteProjectMutation] = useSoftDeleteProjectMutation();
  const [insertProjectMutation] = useInsertProjectMutation();

  console.log('[Products]', 'render');
  console.log('Projects:', data?.projects);

  useEffect(() => {
    console.log('loading state:', loading);
    if (!loading && data?.projects) {
      setProducts(data.projects);
    }
  }, [data, loading]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleCreateNewProject = () => {
    insertProjectMutation({
      variables: {
        project: {
          title: 'New Project',
        },
      },
      onCompleted: (data) => {
        router.push(`/projects/${data?.insert_projects_one?.id}`);
      },
    });
  };

  const handleSelectAllClick = (checked: boolean) => {
    if (checked) {
      const selected = productList.map((n) => n.id);
      setSelected(selected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (title: string) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName: string) => {
    setFilterName(filterName);
  };

  const handleDeleteProduct = async (productId: string) => {
    await softDeleteProjectMutation({ variables: { pk: { id: productId } } });
    refetch();
  };

  const handleDeleteProducts = (selected: string[]) => {
    const deleteProducts = productList.filter((product) => !selected.includes(product.id));
    setSelected([]);
    setProductList(deleteProducts);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productList.length) : 0;

  const filteredProducts = applySortFilter(productList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredProducts.length && Boolean(filterName);

  return (
    <Page title="Projects">
      <Container maxWidth={'lg'}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ mr: 2 }}>
            Projects
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{ fontSize: '11px' }}
            onClick={handleCreateNewProject}
          >
            + Create Project
          </Button>
        </Box>

        <Card sx={{ backgroundColor: 'unset', boxShadow: 'unset' }}>
          <ProductListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteProducts={() => handleDeleteProducts(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table sx={{ borderCollapse: 'unset', borderSpacing: '0px 10px' }}>
                <ProductListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={productList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredProducts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, title, updated_at, owner } = row;
                      const first_name = owner?.first_name;
                      const inventoryType = 'low_stock';
                      const isItemSelected = selected.indexOf(id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox" sx={{ display: 'none' }}>
                            <Checkbox checked={isItemSelected} onClick={() => handleClick(id)} />
                          </TableCell>
                          <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link passHref href={`/projects/${id}`}>
                              <Image
                                disabledEffect
                                alt={title || ''}
                                src="/images/box.png"
                                sx={{
                                  borderRadius: 1.5,
                                  width: 64,
                                  height: 64,
                                  mr: 2,
                                  backgroundColor: '#f0f0f0',
                                  cursor: 'pointer',
                                }}
                              />
                            </Link>
                            <Typography variant="subtitle2" noWrap>
                              <Link href={`/projects/${id}`}>{title}</Link>
                            </Typography>
                          </TableCell>
                          <TableCell style={{ minWidth: 160 }}>
                            {fToNowStrict(updated_at)}
                          </TableCell>
                          <TableCell style={{ minWidth: 160 }}>
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color={'success'}
                            >
                              {inventoryType === 'low_stock' ? sentenceCase('new') : ''}
                            </Label>
                          </TableCell>
                          <TableCell align="left">{first_name}</TableCell>
                          <TableCell align="right">
                            <ProductMoreMenu
                              project_id={id || 'invalid'}
                              onDelete={() => handleDeleteProduct(id)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={5} />
                    </TableRow>
                  )}
                </TableBody>

                {products.length <= 0 && loading == false && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={5}>
                        <Box sx={{ py: 1 }}>
                          <Paper sx={{ py: 6 }}>
                            <Typography gutterBottom align="center" variant="subtitle1">
                              No Projects Found
                            </Typography>
                            <Button
                              variant="outlined"
                              size="small"
                              sx={{ mt: '15px' }}
                              onClick={handleCreateNewProject}
                            >
                              + Create Project
                            </Button>
                          </Paper>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}

                {products.length <= 0 && loading == true && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={5}>
                        <Box sx={{ py: 1 }}>
                          <Paper sx={{ py: 2, backgroundColor: 'unset' }}>
                            <Typography gutterBottom align="center" variant="body2">
                              Loading..
                            </Typography>
                          </Paper>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={5}>
                        <Box sx={{ py: 1 }}>
                          <SearchNotFound sx={{ py: 3 }} searchQuery={filterName} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            sx={{ display: 'none' }}
            rowsPerPageOptions={[5, 10, 25, 9999]}
            component="div"
            count={productList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, value) => setPage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function descendingComparator(a: Anonymous, b: Anonymous, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Anonymous = Record<string | number, string>;

function getComparator(order: string, orderBy: string) {
  return order === 'desc'
    ? (a: Anonymous, b: Anonymous) => descendingComparator(a, b, orderBy)
    : (a: Anonymous, b: Anonymous) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: Projects[], comparator: (a: any, b: any) => number, query: string) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return array.filter(
      (_product) => _product.title?.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return stabilizedThis.map((el) => el[0]);
}
