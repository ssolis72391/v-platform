import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  json: any;
  numeric: any;
  timestamp: any;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

export type CreateProductJsonComparisonExp = {
  _eq?: InputMaybe<Scalars['json']>;
  _gt?: InputMaybe<Scalars['json']>;
  _gte?: InputMaybe<Scalars['json']>;
  _in?: InputMaybe<Array<Scalars['json']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['json']>;
  _lte?: InputMaybe<Scalars['json']>;
  _neq?: InputMaybe<Scalars['json']>;
  _nin?: InputMaybe<Array<Scalars['json']>>;
};

export type CreateProductNumericComparisonExp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

export type CreateProductOutput = {
  __typename?: 'CreateProductOutput';
  category?: Maybe<Scalars['String']>;
  common_materials_url?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  manufacturer?: Maybe<Scalars['String']>;
  mesh_url?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};

export type CreateProductProductsBoolExp = {
  _and?: InputMaybe<Array<CreateProductProductsBoolExp>>;
  _not?: InputMaybe<CreateProductProductsBoolExp>;
  _or?: InputMaybe<Array<CreateProductProductsBoolExp>>;
  category?: InputMaybe<CreateProductStringComparisonExp>;
  common_materials_url?: InputMaybe<CreateProductStringComparisonExp>;
  created_at?: InputMaybe<CreateProductTimestamptzComparisonExp>;
  deleted_at?: InputMaybe<CreateProductTimestamptzComparisonExp>;
  description?: InputMaybe<CreateProductStringComparisonExp>;
  id?: InputMaybe<CreateProductUuidComparisonExp>;
  manufacturer?: InputMaybe<CreateProductStringComparisonExp>;
  mesh_url?: InputMaybe<CreateProductStringComparisonExp>;
  skus?: InputMaybe<CreateProductProductsSkuBoolExp>;
  title?: InputMaybe<CreateProductStringComparisonExp>;
  updated_at?: InputMaybe<CreateProductTimestamptzComparisonExp>;
};

export enum CreateProductProductsConstraint {
  /** unique or primary key constraint */
  ProductPkey = 'product_pkey'
}

export type CreateProductProductsInsertInput = {
  category?: InputMaybe<Scalars['String']>;
  common_materials_url?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  manufacturer?: InputMaybe<Scalars['String']>;
  mesh_url?: InputMaybe<Scalars['String']>;
  skus?: InputMaybe<CreateProductProductsSkuArrRelInsertInput>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

export type CreateProductProductsObjRelInsertInput = {
  data: CreateProductProductsInsertInput;
  on_conflict?: InputMaybe<CreateProductProductsOnConflict>;
};

export type CreateProductProductsOnConflict = {
  constraint: CreateProductProductsConstraint;
  update_columns: Array<CreateProductProductsUpdateColumn>;
  where?: InputMaybe<CreateProductProductsBoolExp>;
};

export type CreateProductProductsSkuArrRelInsertInput = {
  data: Array<CreateProductProductsSkuInsertInput>;
  on_conflict?: InputMaybe<CreateProductProductsSkuOnConflict>;
};

export type CreateProductProductsSkuBoolExp = {
  _and?: InputMaybe<Array<CreateProductProductsSkuBoolExp>>;
  _not?: InputMaybe<CreateProductProductsSkuBoolExp>;
  _or?: InputMaybe<Array<CreateProductProductsSkuBoolExp>>;
  cost?: InputMaybe<CreateProductNumericComparisonExp>;
  created_at?: InputMaybe<CreateProductTimestamptzComparisonExp>;
  deleted_at?: InputMaybe<CreateProductTimestampComparisonExp>;
  description?: InputMaybe<CreateProductStringComparisonExp>;
  id?: InputMaybe<CreateProductUuidComparisonExp>;
  options?: InputMaybe<CreateProductJsonComparisonExp>;
  product?: InputMaybe<CreateProductProductsBoolExp>;
  product_id?: InputMaybe<CreateProductUuidComparisonExp>;
  sku?: InputMaybe<CreateProductStringComparisonExp>;
  title?: InputMaybe<CreateProductStringComparisonExp>;
  updated_at?: InputMaybe<CreateProductTimestamptzComparisonExp>;
};

export enum CreateProductProductsSkuConstraint {
  /** unique or primary key constraint */
  ProductSkuPkey = 'product_sku_pkey',
  /** unique or primary key constraint */
  ProductsSkuSkuKey = 'products_sku_sku_key'
}

export type CreateProductProductsSkuInsertInput = {
  cost?: InputMaybe<Scalars['numeric']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  deleted_at?: InputMaybe<Scalars['timestamp']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  options?: InputMaybe<Scalars['json']>;
  product?: InputMaybe<CreateProductProductsObjRelInsertInput>;
  product_id?: InputMaybe<Scalars['uuid']>;
  sku?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

export type CreateProductProductsSkuOnConflict = {
  constraint: CreateProductProductsSkuConstraint;
  update_columns: Array<CreateProductProductsSkuUpdateColumn>;
  where?: InputMaybe<CreateProductProductsSkuBoolExp>;
};

export enum CreateProductProductsSkuUpdateColumn {
  /** column name */
  Cost = 'cost',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Options = 'options',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  Sku = 'sku',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

export enum CreateProductProductsUpdateColumn {
  /** column name */
  Category = 'category',
  /** column name */
  CommonMaterialsUrl = 'common_materials_url',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Manufacturer = 'manufacturer',
  /** column name */
  MeshUrl = 'mesh_url',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type CreateProductStringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  _niregex?: InputMaybe<Scalars['String']>;
  _nlike?: InputMaybe<Scalars['String']>;
  _nregex?: InputMaybe<Scalars['String']>;
  _nsimilar?: InputMaybe<Scalars['String']>;
  _regex?: InputMaybe<Scalars['String']>;
  _similar?: InputMaybe<Scalars['String']>;
};

export type CreateProductTimestampComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
};

export type CreateProductTimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

export type CreateProductUuidComparisonExp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type CreateProjectOutput = {
  __typename?: 'CreateProjectOutput';
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  file?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  organization_id?: Maybe<Scalars['uuid']>;
  owner_id: Scalars['uuid'];
  takeoff_file?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

export type UpdateProjectOutput = {
  __typename?: 'UpdateProjectOutput';
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  file?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  organization_id?: Maybe<Scalars['uuid']>;
  owner_id: Scalars['uuid'];
  takeoff_file?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']>;
  _gt?: InputMaybe<Scalars['json']>;
  _gte?: InputMaybe<Scalars['json']>;
  _in?: InputMaybe<Array<Scalars['json']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['json']>;
  _lte?: InputMaybe<Scalars['json']>;
  _neq?: InputMaybe<Scalars['json']>;
  _nin?: InputMaybe<Array<Scalars['json']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  create_product?: Maybe<CreateProductOutput>;
  create_project?: Maybe<CreateProjectOutput>;
  /** delete data from the table: "plans" */
  delete_plans?: Maybe<Plans_Mutation_Response>;
  /** delete single row from the table: "plans" */
  delete_plans_by_pk?: Maybe<Plans>;
  /** delete data from the table: "products" */
  delete_products?: Maybe<Products_Mutation_Response>;
  /** delete single row from the table: "products" */
  delete_products_by_pk?: Maybe<Products>;
  /** delete data from the table: "products_sku" */
  delete_products_sku?: Maybe<Products_Sku_Mutation_Response>;
  /** delete single row from the table: "products_sku" */
  delete_products_sku_by_pk?: Maybe<Products_Sku>;
  /** delete data from the table: "projects" */
  delete_projects?: Maybe<Projects_Mutation_Response>;
  /** delete single row from the table: "projects" */
  delete_projects_by_pk?: Maybe<Projects>;
  /** insert data into the table: "plans" */
  insert_plans?: Maybe<Plans_Mutation_Response>;
  /** insert a single row into the table: "plans" */
  insert_plans_one?: Maybe<Plans>;
  /** insert data into the table: "products" */
  insert_products?: Maybe<Products_Mutation_Response>;
  /** insert a single row into the table: "products" */
  insert_products_one?: Maybe<Products>;
  /** insert data into the table: "products_sku" */
  insert_products_sku?: Maybe<Products_Sku_Mutation_Response>;
  /** insert a single row into the table: "products_sku" */
  insert_products_sku_one?: Maybe<Products_Sku>;
  /** insert data into the table: "projects" */
  insert_projects?: Maybe<Projects_Mutation_Response>;
  /** insert a single row into the table: "projects" */
  insert_projects_one?: Maybe<Projects>;
  /** insert data into the table: "vh_last_seen" */
  insert_vh_last_seen?: Maybe<Vh_Last_Seen_Mutation_Response>;
  /** insert a single row into the table: "vh_last_seen" */
  insert_vh_last_seen_one?: Maybe<Vh_Last_Seen>;
  /** update data of the table: "plans" */
  update_plans?: Maybe<Plans_Mutation_Response>;
  /** update single row of the table: "plans" */
  update_plans_by_pk?: Maybe<Plans>;
  /** update data of the table: "products" */
  update_products?: Maybe<Products_Mutation_Response>;
  /** update single row of the table: "products" */
  update_products_by_pk?: Maybe<Products>;
  /** update data of the table: "products_sku" */
  update_products_sku?: Maybe<Products_Sku_Mutation_Response>;
  /** update single row of the table: "products_sku" */
  update_products_sku_by_pk?: Maybe<Products_Sku>;
  update_project?: Maybe<UpdateProjectOutput>;
  /** update data of the table: "projects" */
  update_projects?: Maybe<Projects_Mutation_Response>;
  /** update single row of the table: "projects" */
  update_projects_by_pk?: Maybe<Projects>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update data of the table: "vh_last_seen" */
  update_vh_last_seen?: Maybe<Vh_Last_Seen_Mutation_Response>;
  /** update single row of the table: "vh_last_seen" */
  update_vh_last_seen_by_pk?: Maybe<Vh_Last_Seen>;
};


/** mutation root */
export type Mutation_RootCreate_ProductArgs = {
  category?: InputMaybe<Scalars['String']>;
  common_materials_url?: InputMaybe<Scalars['String']>;
  data?: InputMaybe<Array<CreateProductProductsSkuInsertInput>>;
  description?: InputMaybe<Scalars['String']>;
  manufacturer?: InputMaybe<Scalars['String']>;
  mesh_url?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


/** mutation root */
export type Mutation_RootCreate_ProjectArgs = {
  file?: InputMaybe<Scalars['String']>;
  takeoff_file?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


/** mutation root */
export type Mutation_RootDelete_PlansArgs = {
  where: Plans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Plans_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ProductsArgs = {
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Products_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Products_SkuArgs = {
  where: Products_Sku_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Products_Sku_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ProjectsArgs = {
  where: Projects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Projects_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_PlansArgs = {
  objects: Array<Plans_Insert_Input>;
  on_conflict?: InputMaybe<Plans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Plans_OneArgs = {
  object: Plans_Insert_Input;
  on_conflict?: InputMaybe<Plans_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProductsArgs = {
  objects: Array<Products_Insert_Input>;
  on_conflict?: InputMaybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Products_OneArgs = {
  object: Products_Insert_Input;
  on_conflict?: InputMaybe<Products_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Products_SkuArgs = {
  objects: Array<Products_Sku_Insert_Input>;
  on_conflict?: InputMaybe<Products_Sku_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Products_Sku_OneArgs = {
  object: Products_Sku_Insert_Input;
  on_conflict?: InputMaybe<Products_Sku_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectsArgs = {
  objects: Array<Projects_Insert_Input>;
  on_conflict?: InputMaybe<Projects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Projects_OneArgs = {
  object: Projects_Insert_Input;
  on_conflict?: InputMaybe<Projects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vh_Last_SeenArgs = {
  objects: Array<Vh_Last_Seen_Insert_Input>;
  on_conflict?: InputMaybe<Vh_Last_Seen_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vh_Last_Seen_OneArgs = {
  object: Vh_Last_Seen_Insert_Input;
  on_conflict?: InputMaybe<Vh_Last_Seen_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_PlansArgs = {
  _inc?: InputMaybe<Plans_Inc_Input>;
  _set?: InputMaybe<Plans_Set_Input>;
  where: Plans_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Plans_By_PkArgs = {
  _inc?: InputMaybe<Plans_Inc_Input>;
  _set?: InputMaybe<Plans_Set_Input>;
  pk_columns: Plans_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProductsArgs = {
  _set?: InputMaybe<Products_Set_Input>;
  where: Products_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Products_By_PkArgs = {
  _set?: InputMaybe<Products_Set_Input>;
  pk_columns: Products_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Products_SkuArgs = {
  _inc?: InputMaybe<Products_Sku_Inc_Input>;
  _set?: InputMaybe<Products_Sku_Set_Input>;
  where: Products_Sku_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Products_Sku_By_PkArgs = {
  _inc?: InputMaybe<Products_Sku_Inc_Input>;
  _set?: InputMaybe<Products_Sku_Set_Input>;
  pk_columns: Products_Sku_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectArgs = {
  file?: InputMaybe<Scalars['String']>;
  id: Scalars['uuid'];
  takeoff_file?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectsArgs = {
  _set?: InputMaybe<Projects_Set_Input>;
  where: Projects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Projects_By_PkArgs = {
  _set?: InputMaybe<Projects_Set_Input>;
  pk_columns: Projects_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Vh_Last_SeenArgs = {
  _set?: InputMaybe<Vh_Last_Seen_Set_Input>;
  where: Vh_Last_Seen_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vh_Last_Seen_By_PkArgs = {
  _set?: InputMaybe<Vh_Last_Seen_Set_Input>;
  pk_columns: Vh_Last_Seen_Pk_Columns_Input;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "organizations" */
export type Organizations = {
  __typename?: 'organizations';
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  projects: Array<Projects>;
  updated_at: Scalars['timestamptz'];
  /** fetch data from the table: "users" */
  users: Array<Users>;
};


/** columns and relationships of "organizations" */
export type OrganizationsProjectsArgs = {
  distinct_on?: InputMaybe<Array<Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Order_By>>;
  where?: InputMaybe<Projects_Bool_Exp>;
};


/** columns and relationships of "organizations" */
export type OrganizationsUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "organizations". All fields are combined with a logical 'AND'. */
export type Organizations_Bool_Exp = {
  _and?: InputMaybe<Array<Organizations_Bool_Exp>>;
  _not?: InputMaybe<Organizations_Bool_Exp>;
  _or?: InputMaybe<Array<Organizations_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  projects?: InputMaybe<Projects_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  users?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "organizations". */
export type Organizations_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  projects_aggregate?: InputMaybe<Projects_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  users_aggregate?: InputMaybe<Users_Aggregate_Order_By>;
};

/** select columns of table "organizations" */
export enum Organizations_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "plans" */
export type Plans = {
  __typename?: 'plans';
  calibration?: Maybe<Scalars['json']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  fullres?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  location?: Maybe<Scalars['json']>;
  /** An object relationship */
  project?: Maybe<Projects>;
  project_id?: Maybe<Scalars['uuid']>;
  scale?: Maybe<Scalars['numeric']>;
  sort?: Maybe<Scalars['Int']>;
  source?: Maybe<Scalars['json']>;
  thumbnail?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "plans" */
export type PlansCalibrationArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "plans" */
export type PlansLocationArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "plans" */
export type PlansSourceArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "plans" */
export type Plans_Aggregate_Order_By = {
  avg?: InputMaybe<Plans_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Plans_Max_Order_By>;
  min?: InputMaybe<Plans_Min_Order_By>;
  stddev?: InputMaybe<Plans_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Plans_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Plans_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Plans_Sum_Order_By>;
  var_pop?: InputMaybe<Plans_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Plans_Var_Samp_Order_By>;
  variance?: InputMaybe<Plans_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "plans" */
export type Plans_Arr_Rel_Insert_Input = {
  data: Array<Plans_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Plans_On_Conflict>;
};

/** order by avg() on columns of table "plans" */
export type Plans_Avg_Order_By = {
  scale?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "plans". All fields are combined with a logical 'AND'. */
export type Plans_Bool_Exp = {
  _and?: InputMaybe<Array<Plans_Bool_Exp>>;
  _not?: InputMaybe<Plans_Bool_Exp>;
  _or?: InputMaybe<Array<Plans_Bool_Exp>>;
  calibration?: InputMaybe<Json_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  fullres?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  location?: InputMaybe<Json_Comparison_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
  scale?: InputMaybe<Numeric_Comparison_Exp>;
  sort?: InputMaybe<Int_Comparison_Exp>;
  source?: InputMaybe<Json_Comparison_Exp>;
  thumbnail?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "plans" */
export enum Plans_Constraint {
  /** unique or primary key constraint */
  PlansPkey = 'plans_pkey'
}

/** input type for incrementing numeric columns in table "plans" */
export type Plans_Inc_Input = {
  scale?: InputMaybe<Scalars['numeric']>;
  sort?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "plans" */
export type Plans_Insert_Input = {
  calibration?: InputMaybe<Scalars['json']>;
  fullres?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  location?: InputMaybe<Scalars['json']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: InputMaybe<Scalars['uuid']>;
  scale?: InputMaybe<Scalars['numeric']>;
  sort?: InputMaybe<Scalars['Int']>;
  source?: InputMaybe<Scalars['json']>;
  thumbnail?: InputMaybe<Scalars['String']>;
};

/** order by max() on columns of table "plans" */
export type Plans_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  fullres?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  scale?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
  thumbnail?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "plans" */
export type Plans_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  fullres?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  scale?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
  thumbnail?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "plans" */
export type Plans_Mutation_Response = {
  __typename?: 'plans_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Plans>;
};

/** on conflict condition type for table "plans" */
export type Plans_On_Conflict = {
  constraint: Plans_Constraint;
  update_columns?: Array<Plans_Update_Column>;
  where?: InputMaybe<Plans_Bool_Exp>;
};

/** Ordering options when selecting data from "plans". */
export type Plans_Order_By = {
  calibration?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  fullres?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_id?: InputMaybe<Order_By>;
  scale?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
  source?: InputMaybe<Order_By>;
  thumbnail?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: plans */
export type Plans_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "plans" */
export enum Plans_Select_Column {
  /** column name */
  Calibration = 'calibration',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Fullres = 'fullres',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Scale = 'scale',
  /** column name */
  Sort = 'sort',
  /** column name */
  Source = 'source',
  /** column name */
  Thumbnail = 'thumbnail',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "plans" */
export type Plans_Set_Input = {
  calibration?: InputMaybe<Scalars['json']>;
  fullres?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['json']>;
  scale?: InputMaybe<Scalars['numeric']>;
  sort?: InputMaybe<Scalars['Int']>;
  thumbnail?: InputMaybe<Scalars['String']>;
};

/** order by stddev() on columns of table "plans" */
export type Plans_Stddev_Order_By = {
  scale?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "plans" */
export type Plans_Stddev_Pop_Order_By = {
  scale?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "plans" */
export type Plans_Stddev_Samp_Order_By = {
  scale?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "plans" */
export type Plans_Sum_Order_By = {
  scale?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** update columns of table "plans" */
export enum Plans_Update_Column {
  /** column name */
  Calibration = 'calibration',
  /** column name */
  Fullres = 'fullres',
  /** column name */
  Location = 'location',
  /** column name */
  Scale = 'scale',
  /** column name */
  Sort = 'sort',
  /** column name */
  Thumbnail = 'thumbnail'
}

/** order by var_pop() on columns of table "plans" */
export type Plans_Var_Pop_Order_By = {
  scale?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "plans" */
export type Plans_Var_Samp_Order_By = {
  scale?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "plans" */
export type Plans_Variance_Order_By = {
  scale?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** columns and relationships of "products" */
export type Products = {
  __typename?: 'products';
  category?: Maybe<Scalars['String']>;
  common_materials_url?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  manufacturer?: Maybe<Scalars['String']>;
  mesh_url?: Maybe<Scalars['String']>;
  /** An array relationship */
  skus: Array<Products_Sku>;
  thumbnail_url?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "products" */
export type ProductsSkusArgs = {
  distinct_on?: InputMaybe<Array<Products_Sku_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Products_Sku_Order_By>>;
  where?: InputMaybe<Products_Sku_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "products". All fields are combined with a logical 'AND'. */
export type Products_Bool_Exp = {
  _and?: InputMaybe<Array<Products_Bool_Exp>>;
  _not?: InputMaybe<Products_Bool_Exp>;
  _or?: InputMaybe<Array<Products_Bool_Exp>>;
  category?: InputMaybe<String_Comparison_Exp>;
  common_materials_url?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  manufacturer?: InputMaybe<String_Comparison_Exp>;
  mesh_url?: InputMaybe<String_Comparison_Exp>;
  skus?: InputMaybe<Products_Sku_Bool_Exp>;
  thumbnail_url?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "products" */
export enum Products_Constraint {
  /** unique or primary key constraint */
  ProductPkey = 'product_pkey'
}

/** input type for inserting data into table "products" */
export type Products_Insert_Input = {
  category?: InputMaybe<Scalars['String']>;
  common_materials_base64?: InputMaybe<Scalars['String']>;
  common_materials_url?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  manufacturer?: InputMaybe<Scalars['String']>;
  mesh_base64?: InputMaybe<Scalars['String']>;
  mesh_url?: InputMaybe<Scalars['String']>;
  skus?: InputMaybe<Products_Sku_Arr_Rel_Insert_Input>;
  thumbnail_base64?: InputMaybe<Scalars['String']>;
  thumbnail_url?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

/** response of any mutation on the table "products" */
export type Products_Mutation_Response = {
  __typename?: 'products_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Products>;
};

/** input type for inserting object relation for remote table "products" */
export type Products_Obj_Rel_Insert_Input = {
  data: Products_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Products_On_Conflict>;
};

/** on conflict condition type for table "products" */
export type Products_On_Conflict = {
  constraint: Products_Constraint;
  update_columns?: Array<Products_Update_Column>;
  where?: InputMaybe<Products_Bool_Exp>;
};

/** Ordering options when selecting data from "products". */
export type Products_Order_By = {
  category?: InputMaybe<Order_By>;
  common_materials_url?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  manufacturer?: InputMaybe<Order_By>;
  mesh_url?: InputMaybe<Order_By>;
  skus_aggregate?: InputMaybe<Products_Sku_Aggregate_Order_By>;
  thumbnail_url?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: products */
export type Products_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "products" */
export enum Products_Select_Column {
  /** column name */
  Category = 'category',
  /** column name */
  CommonMaterialsUrl = 'common_materials_url',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Manufacturer = 'manufacturer',
  /** column name */
  MeshUrl = 'mesh_url',
  /** column name */
  ThumbnailUrl = 'thumbnail_url',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "products" */
export type Products_Set_Input = {
  category?: InputMaybe<Scalars['String']>;
  common_materials_base64?: InputMaybe<Scalars['String']>;
  common_materials_url?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  manufacturer?: InputMaybe<Scalars['String']>;
  mesh_base64?: InputMaybe<Scalars['String']>;
  mesh_url?: InputMaybe<Scalars['String']>;
  thumbnail_base64?: InputMaybe<Scalars['String']>;
  thumbnail_url?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "products_sku" */
export type Products_Sku = {
  __typename?: 'products_sku';
  cost?: Maybe<Scalars['numeric']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamp']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  materials?: Maybe<Scalars['json']>;
  options?: Maybe<Scalars['json']>;
  /** An object relationship */
  product: Products;
  product_id: Scalars['uuid'];
  sku: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "products_sku" */
export type Products_SkuMaterialsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "products_sku" */
export type Products_SkuOptionsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** order by aggregate values of table "products_sku" */
export type Products_Sku_Aggregate_Order_By = {
  avg?: InputMaybe<Products_Sku_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Products_Sku_Max_Order_By>;
  min?: InputMaybe<Products_Sku_Min_Order_By>;
  stddev?: InputMaybe<Products_Sku_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Products_Sku_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Products_Sku_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Products_Sku_Sum_Order_By>;
  var_pop?: InputMaybe<Products_Sku_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Products_Sku_Var_Samp_Order_By>;
  variance?: InputMaybe<Products_Sku_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "products_sku" */
export type Products_Sku_Arr_Rel_Insert_Input = {
  data: Array<Products_Sku_Insert_Input>;
  /** on conflict condition */
  on_conflict?: InputMaybe<Products_Sku_On_Conflict>;
};

/** order by avg() on columns of table "products_sku" */
export type Products_Sku_Avg_Order_By = {
  cost?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "products_sku". All fields are combined with a logical 'AND'. */
export type Products_Sku_Bool_Exp = {
  _and?: InputMaybe<Array<Products_Sku_Bool_Exp>>;
  _not?: InputMaybe<Products_Sku_Bool_Exp>;
  _or?: InputMaybe<Array<Products_Sku_Bool_Exp>>;
  cost?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamp_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  materials?: InputMaybe<Json_Comparison_Exp>;
  options?: InputMaybe<Json_Comparison_Exp>;
  product?: InputMaybe<Products_Bool_Exp>;
  product_id?: InputMaybe<Uuid_Comparison_Exp>;
  sku?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "products_sku" */
export enum Products_Sku_Constraint {
  /** unique or primary key constraint */
  ProductSkuPkey = 'product_sku_pkey',
  /** unique or primary key constraint */
  ProductsSkuSkuKey = 'products_sku_sku_key'
}

/** input type for incrementing numeric columns in table "products_sku" */
export type Products_Sku_Inc_Input = {
  cost?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "products_sku" */
export type Products_Sku_Insert_Input = {
  cost?: InputMaybe<Scalars['numeric']>;
  description?: InputMaybe<Scalars['String']>;
  materials?: InputMaybe<Scalars['json']>;
  options?: InputMaybe<Scalars['json']>;
  product?: InputMaybe<Products_Obj_Rel_Insert_Input>;
  product_id?: InputMaybe<Scalars['uuid']>;
  sku?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

/** order by max() on columns of table "products_sku" */
export type Products_Sku_Max_Order_By = {
  cost?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  sku?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "products_sku" */
export type Products_Sku_Min_Order_By = {
  cost?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  product_id?: InputMaybe<Order_By>;
  sku?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "products_sku" */
export type Products_Sku_Mutation_Response = {
  __typename?: 'products_sku_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Products_Sku>;
};

/** on conflict condition type for table "products_sku" */
export type Products_Sku_On_Conflict = {
  constraint: Products_Sku_Constraint;
  update_columns?: Array<Products_Sku_Update_Column>;
  where?: InputMaybe<Products_Sku_Bool_Exp>;
};

/** Ordering options when selecting data from "products_sku". */
export type Products_Sku_Order_By = {
  cost?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  materials?: InputMaybe<Order_By>;
  options?: InputMaybe<Order_By>;
  product?: InputMaybe<Products_Order_By>;
  product_id?: InputMaybe<Order_By>;
  sku?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: products_sku */
export type Products_Sku_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "products_sku" */
export enum Products_Sku_Select_Column {
  /** column name */
  Cost = 'cost',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Materials = 'materials',
  /** column name */
  Options = 'options',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  Sku = 'sku',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "products_sku" */
export type Products_Sku_Set_Input = {
  cost?: InputMaybe<Scalars['numeric']>;
  description?: InputMaybe<Scalars['String']>;
  materials?: InputMaybe<Scalars['json']>;
  options?: InputMaybe<Scalars['json']>;
  product_id?: InputMaybe<Scalars['uuid']>;
  sku?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

/** order by stddev() on columns of table "products_sku" */
export type Products_Sku_Stddev_Order_By = {
  cost?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "products_sku" */
export type Products_Sku_Stddev_Pop_Order_By = {
  cost?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "products_sku" */
export type Products_Sku_Stddev_Samp_Order_By = {
  cost?: InputMaybe<Order_By>;
};

/** order by sum() on columns of table "products_sku" */
export type Products_Sku_Sum_Order_By = {
  cost?: InputMaybe<Order_By>;
};

/** update columns of table "products_sku" */
export enum Products_Sku_Update_Column {
  /** column name */
  Cost = 'cost',
  /** column name */
  Description = 'description',
  /** column name */
  Materials = 'materials',
  /** column name */
  Options = 'options',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  Sku = 'sku',
  /** column name */
  Title = 'title'
}

/** order by var_pop() on columns of table "products_sku" */
export type Products_Sku_Var_Pop_Order_By = {
  cost?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "products_sku" */
export type Products_Sku_Var_Samp_Order_By = {
  cost?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "products_sku" */
export type Products_Sku_Variance_Order_By = {
  cost?: InputMaybe<Order_By>;
};

/** update columns of table "products" */
export enum Products_Update_Column {
  /** column name */
  Category = 'category',
  /** column name */
  CommonMaterialsBase64 = 'common_materials_base64',
  /** column name */
  CommonMaterialsUrl = 'common_materials_url',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Manufacturer = 'manufacturer',
  /** column name */
  MeshBase64 = 'mesh_base64',
  /** column name */
  MeshUrl = 'mesh_url',
  /** column name */
  ThumbnailBase64 = 'thumbnail_base64',
  /** column name */
  ThumbnailUrl = 'thumbnail_url',
  /** column name */
  Title = 'title'
}

/** columns and relationships of "projects" */
export type Projects = {
  __typename?: 'projects';
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  file?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  /** An object relationship */
  organization?: Maybe<Organizations>;
  organization_id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  owner?: Maybe<Users>;
  owner_id: Scalars['uuid'];
  /** An array relationship */
  plans: Array<Plans>;
  takeoff_file?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "projects" */
export type ProjectsPlansArgs = {
  distinct_on?: InputMaybe<Array<Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Plans_Order_By>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};

/** order by aggregate values of table "projects" */
export type Projects_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Projects_Max_Order_By>;
  min?: InputMaybe<Projects_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "projects". All fields are combined with a logical 'AND'. */
export type Projects_Bool_Exp = {
  _and?: InputMaybe<Array<Projects_Bool_Exp>>;
  _not?: InputMaybe<Projects_Bool_Exp>;
  _or?: InputMaybe<Array<Projects_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  file?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  organization?: InputMaybe<Organizations_Bool_Exp>;
  organization_id?: InputMaybe<Uuid_Comparison_Exp>;
  owner?: InputMaybe<Users_Bool_Exp>;
  owner_id?: InputMaybe<Uuid_Comparison_Exp>;
  plans?: InputMaybe<Plans_Bool_Exp>;
  takeoff_file?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "projects" */
export enum Projects_Constraint {
  /** unique or primary key constraint */
  ProjectsPkey = 'projects_pkey'
}

/** input type for inserting data into table "projects" */
export type Projects_Insert_Input = {
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  file?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  plans?: InputMaybe<Plans_Arr_Rel_Insert_Input>;
  takeoff_file?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** order by max() on columns of table "projects" */
export type Projects_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  file?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  takeoff_file?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "projects" */
export type Projects_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  file?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  owner_id?: InputMaybe<Order_By>;
  takeoff_file?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "projects" */
export type Projects_Mutation_Response = {
  __typename?: 'projects_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Projects>;
};

/** input type for inserting object relation for remote table "projects" */
export type Projects_Obj_Rel_Insert_Input = {
  data: Projects_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Projects_On_Conflict>;
};

/** on conflict condition type for table "projects" */
export type Projects_On_Conflict = {
  constraint: Projects_Constraint;
  update_columns?: Array<Projects_Update_Column>;
  where?: InputMaybe<Projects_Bool_Exp>;
};

/** Ordering options when selecting data from "projects". */
export type Projects_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  file?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  organization?: InputMaybe<Organizations_Order_By>;
  organization_id?: InputMaybe<Order_By>;
  owner?: InputMaybe<Users_Order_By>;
  owner_id?: InputMaybe<Order_By>;
  plans_aggregate?: InputMaybe<Plans_Aggregate_Order_By>;
  takeoff_file?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: projects */
export type Projects_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "projects" */
export enum Projects_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  File = 'file',
  /** column name */
  Id = 'id',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  TakeoffFile = 'takeoff_file',
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "projects" */
export type Projects_Set_Input = {
  deleted_at?: InputMaybe<Scalars['timestamptz']>;
  file?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  org_public?: InputMaybe<Scalars['Boolean']>;
  organization_id?: InputMaybe<Scalars['uuid']>;
  owner_id?: InputMaybe<Scalars['uuid']>;
  takeoff_file?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** update columns of table "projects" */
export enum Projects_Update_Column {
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  File = 'file',
  /** column name */
  Id = 'id',
  /** column name */
  OrgPublic = 'org_public',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  TakeoffFile = 'takeoff_file',
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "organizations" */
  list_organizations: Array<Organizations>;
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  /** An array relationship */
  plans: Array<Plans>;
  /** fetch data from the table: "plans" using primary key columns */
  plans_by_pk?: Maybe<Plans>;
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "products_sku" */
  products_sku: Array<Products_Sku>;
  /** fetch data from the table: "products_sku" using primary key columns */
  products_sku_by_pk?: Maybe<Products_Sku>;
  /** An array relationship */
  projects: Array<Projects>;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "versions" */
  versions: Array<Versions>;
  /** fetch data from the table: "versions" using primary key columns */
  versions_by_pk?: Maybe<Versions>;
  /** fetch data from the table: "vh_last_seen" */
  vh_last_seen: Array<Vh_Last_Seen>;
  /** fetch data from the table: "vh_last_seen" using primary key columns */
  vh_last_seen_by_pk?: Maybe<Vh_Last_Seen>;
};


export type Query_RootList_OrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Query_RootOrganizations_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPlansArgs = {
  distinct_on?: InputMaybe<Array<Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Plans_Order_By>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


export type Query_RootPlans_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProductsArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Query_RootProducts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProducts_SkuArgs = {
  distinct_on?: InputMaybe<Array<Products_Sku_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Products_Sku_Order_By>>;
  where?: InputMaybe<Products_Sku_Bool_Exp>;
};


export type Query_RootProducts_Sku_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProjectsArgs = {
  distinct_on?: InputMaybe<Array<Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Order_By>>;
  where?: InputMaybe<Projects_Bool_Exp>;
};


export type Query_RootProjects_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVersionsArgs = {
  distinct_on?: InputMaybe<Array<Versions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Versions_Order_By>>;
  where?: InputMaybe<Versions_Bool_Exp>;
};


export type Query_RootVersions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVh_Last_SeenArgs = {
  distinct_on?: InputMaybe<Array<Vh_Last_Seen_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vh_Last_Seen_Order_By>>;
  where?: InputMaybe<Vh_Last_Seen_Bool_Exp>;
};


export type Query_RootVh_Last_Seen_By_PkArgs = {
  id: Scalars['bigint'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "organizations" */
  list_organizations: Array<Organizations>;
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  /** An array relationship */
  plans: Array<Plans>;
  /** fetch data from the table: "plans" using primary key columns */
  plans_by_pk?: Maybe<Plans>;
  /** fetch data from the table: "products" */
  products: Array<Products>;
  /** fetch data from the table: "products" using primary key columns */
  products_by_pk?: Maybe<Products>;
  /** fetch data from the table: "products_sku" */
  products_sku: Array<Products_Sku>;
  /** fetch data from the table: "products_sku" using primary key columns */
  products_sku_by_pk?: Maybe<Products_Sku>;
  /** An array relationship */
  projects: Array<Projects>;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table: "versions" */
  versions: Array<Versions>;
  /** fetch data from the table: "versions" using primary key columns */
  versions_by_pk?: Maybe<Versions>;
  /** fetch data from the table: "vh_last_seen" */
  vh_last_seen: Array<Vh_Last_Seen>;
  /** fetch data from the table: "vh_last_seen" using primary key columns */
  vh_last_seen_by_pk?: Maybe<Vh_Last_Seen>;
};


export type Subscription_RootList_OrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Subscription_RootOrganizations_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPlansArgs = {
  distinct_on?: InputMaybe<Array<Plans_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Plans_Order_By>>;
  where?: InputMaybe<Plans_Bool_Exp>;
};


export type Subscription_RootPlans_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProductsArgs = {
  distinct_on?: InputMaybe<Array<Products_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Products_Order_By>>;
  where?: InputMaybe<Products_Bool_Exp>;
};


export type Subscription_RootProducts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProducts_SkuArgs = {
  distinct_on?: InputMaybe<Array<Products_Sku_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Products_Sku_Order_By>>;
  where?: InputMaybe<Products_Sku_Bool_Exp>;
};


export type Subscription_RootProducts_Sku_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProjectsArgs = {
  distinct_on?: InputMaybe<Array<Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Projects_Order_By>>;
  where?: InputMaybe<Projects_Bool_Exp>;
};


export type Subscription_RootProjects_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootVersionsArgs = {
  distinct_on?: InputMaybe<Array<Versions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Versions_Order_By>>;
  where?: InputMaybe<Versions_Bool_Exp>;
};


export type Subscription_RootVersions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootVh_Last_SeenArgs = {
  distinct_on?: InputMaybe<Array<Vh_Last_Seen_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vh_Last_Seen_Order_By>>;
  where?: InputMaybe<Vh_Last_Seen_Bool_Exp>;
};


export type Subscription_RootVh_Last_Seen_By_PkArgs = {
  id: Scalars['bigint'];
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  auth_id?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  email: Scalars['String'];
  first_name?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  last_name?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  organization?: Maybe<Organizations>;
  organization_id?: Maybe<Scalars['uuid']>;
  updated_at: Scalars['timestamptz'];
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Users_Max_Order_By>;
  min?: InputMaybe<Users_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  auth_id?: InputMaybe<String_Comparison_Exp>;
  avatar?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  first_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  last_name?: InputMaybe<String_Comparison_Exp>;
  last_seen?: InputMaybe<Timestamptz_Comparison_Exp>;
  organization?: InputMaybe<Organizations_Bool_Exp>;
  organization_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  auth_id?: InputMaybe<Order_By>;
  avatar?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  last_seen?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  auth_id?: InputMaybe<Order_By>;
  avatar?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  last_seen?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  auth_id?: InputMaybe<Order_By>;
  avatar?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  last_seen?: InputMaybe<Order_By>;
  organization?: InputMaybe<Organizations_Order_By>;
  organization_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  AuthId = 'auth_id',
  /** column name */
  Avatar = 'avatar',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  avatar?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

/**
 * config for app.virtual.haus
 *
 *
 * columns and relationships of "versions"
 *
 */
export type Versions = {
  __typename?: 'versions';
  created_at: Scalars['timestamptz'];
  deleted_at?: Maybe<Scalars['timestamptz']>;
  domain?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  model?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  project?: Maybe<Scalars['String']>;
  stable: Scalars['Boolean'];
  type?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
  version?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "versions". All fields are combined with a logical 'AND'. */
export type Versions_Bool_Exp = {
  _and?: InputMaybe<Array<Versions_Bool_Exp>>;
  _not?: InputMaybe<Versions_Bool_Exp>;
  _or?: InputMaybe<Array<Versions_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  deleted_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  domain?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  model?: InputMaybe<String_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  project?: InputMaybe<String_Comparison_Exp>;
  stable?: InputMaybe<Boolean_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  version?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "versions". */
export type Versions_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deleted_at?: InputMaybe<Order_By>;
  domain?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  model?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  project?: InputMaybe<Order_By>;
  stable?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** select columns of table "versions" */
export enum Versions_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Domain = 'domain',
  /** column name */
  Id = 'id',
  /** column name */
  Model = 'model',
  /** column name */
  Notes = 'notes',
  /** column name */
  Project = 'project',
  /** column name */
  Stable = 'stable',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Version = 'version'
}

/** columns and relationships of "vh_last_seen" */
export type Vh_Last_Seen = {
  __typename?: 'vh_last_seen';
  created_at: Scalars['timestamptz'];
  data?: Maybe<Scalars['json']>;
  id: Scalars['bigint'];
  updated_at: Scalars['timestamptz'];
  user_id: Scalars['uuid'];
};


/** columns and relationships of "vh_last_seen" */
export type Vh_Last_SeenDataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "vh_last_seen". All fields are combined with a logical 'AND'. */
export type Vh_Last_Seen_Bool_Exp = {
  _and?: InputMaybe<Array<Vh_Last_Seen_Bool_Exp>>;
  _not?: InputMaybe<Vh_Last_Seen_Bool_Exp>;
  _or?: InputMaybe<Array<Vh_Last_Seen_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  data?: InputMaybe<Json_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "vh_last_seen" */
export enum Vh_Last_Seen_Constraint {
  /** unique or primary key constraint */
  VhLastSeenPkey = 'vh_last_seen_pkey',
  /** unique or primary key constraint */
  VhLastSeenUserIdKey = 'vh_last_seen_user_id_key'
}

/** input type for inserting data into table "vh_last_seen" */
export type Vh_Last_Seen_Insert_Input = {
  data?: InputMaybe<Scalars['json']>;
};

/** response of any mutation on the table "vh_last_seen" */
export type Vh_Last_Seen_Mutation_Response = {
  __typename?: 'vh_last_seen_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vh_Last_Seen>;
};

/** on conflict condition type for table "vh_last_seen" */
export type Vh_Last_Seen_On_Conflict = {
  constraint: Vh_Last_Seen_Constraint;
  update_columns?: Array<Vh_Last_Seen_Update_Column>;
  where?: InputMaybe<Vh_Last_Seen_Bool_Exp>;
};

/** Ordering options when selecting data from "vh_last_seen". */
export type Vh_Last_Seen_Order_By = {
  created_at?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vh_last_seen */
export type Vh_Last_Seen_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "vh_last_seen" */
export enum Vh_Last_Seen_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Data = 'data',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "vh_last_seen" */
export type Vh_Last_Seen_Set_Input = {
  data?: InputMaybe<Scalars['json']>;
};

/** update columns of table "vh_last_seen" */
export enum Vh_Last_Seen_Update_Column {
  /** column name */
  Data = 'data'
}

export type GetAuthUserDataQueryVariables = Exact<{
  id: Scalars['uuid'];
  domain: Scalars['String'];
}>;


export type GetAuthUserDataQuery = { __typename?: 'query_root', users_by_pk?: { __typename?: 'users', id: any, first_name?: string | null, last_name?: string | null, email: string, auth_id?: string | null, last_seen?: any | null, avatar?: string | null, organization_id?: any | null, created_at: any, organization?: { __typename?: 'organizations', id: any, name: string } | null } | null, versions: Array<{ __typename?: 'versions', id: any, project?: string | null, version?: string | null, stable: boolean, domain?: string | null, model?: string | null, updated_at: any, created_at: any }> };

export type VhLastSeenMutationVariables = Exact<{
  data: Scalars['json'];
}>;


export type VhLastSeenMutation = { __typename?: 'mutation_root', insert_vh_last_seen_one?: { __typename?: 'vh_last_seen', id: any, user_id: any, data?: any | null, created_at: any, updated_at: any } | null };

export type ListProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListProjectsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'projects', id: any, title?: string | null, type?: string | null, created_at: any, updated_at: any, deleted_at?: any | null, owner?: { __typename?: 'users', id: any, first_name?: string | null, last_name?: string | null, avatar?: string | null } | null, organization?: { __typename?: 'organizations', id: any, name: string } | null }> };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetProjectQuery = { __typename?: 'query_root', projects_by_pk?: { __typename?: 'projects', id: any, title?: string | null, takeoff_file?: string | null, organization?: { __typename?: 'organizations', id: any, name: string } | null } | null };

export type InsertProjectMutationVariables = Exact<{
  project: Projects_Insert_Input;
}>;


export type InsertProjectMutation = { __typename?: 'mutation_root', insert_projects_one?: { __typename?: 'projects', id: any, title?: string | null } | null };

export type UpdateProjectMutationVariables = Exact<{
  pk: Projects_Pk_Columns_Input;
  project: Projects_Set_Input;
}>;


export type UpdateProjectMutation = { __typename?: 'mutation_root', update_projects_by_pk?: { __typename?: 'projects', id: any, title?: string | null, updated_at: any } | null };

export type SoftDeleteProjectMutationVariables = Exact<{
  pk: Projects_Pk_Columns_Input;
}>;


export type SoftDeleteProjectMutation = { __typename?: 'mutation_root', update_projects_by_pk?: { __typename?: 'projects', id: any, deleted_at?: any | null } | null };

export type ListUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type ListUsersQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', id: any, first_name?: string | null, last_name?: string | null, email: string, avatar?: string | null }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetUserQuery = { __typename?: 'query_root', users_by_pk?: { __typename?: 'users', id: any, first_name?: string | null, last_name?: string | null, email: string, avatar?: string | null } | null };

export type UpdateUserMutationVariables = Exact<{
  pk: Users_Pk_Columns_Input;
  user: Users_Set_Input;
}>;


export type UpdateUserMutation = { __typename?: 'mutation_root', update_users_by_pk?: { __typename?: 'users', id: any, updated_at: any } | null };


export const GetAuthUserDataDocument = gql`
    query GetAuthUserData($id: uuid!, $domain: String!) {
  users_by_pk(id: $id) {
    id
    first_name
    last_name
    email
    auth_id
    last_seen
    avatar
    organization_id
    organization {
      id
      name
    }
    created_at
  }
  versions(
    limit: 1
    where: {domain: {_eq: $domain}}
    order_by: {created_at: desc}
  ) {
    id
    project
    version
    stable
    domain
    model
    updated_at
    created_at
  }
}
    `;

/**
 * __useGetAuthUserDataQuery__
 *
 * To run a query within a React component, call `useGetAuthUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthUserDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *      domain: // value for 'domain'
 *   },
 * });
 */
export function useGetAuthUserDataQuery(baseOptions: Apollo.QueryHookOptions<GetAuthUserDataQuery, GetAuthUserDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthUserDataQuery, GetAuthUserDataQueryVariables>(GetAuthUserDataDocument, options);
      }
export function useGetAuthUserDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthUserDataQuery, GetAuthUserDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthUserDataQuery, GetAuthUserDataQueryVariables>(GetAuthUserDataDocument, options);
        }
export type GetAuthUserDataQueryHookResult = ReturnType<typeof useGetAuthUserDataQuery>;
export type GetAuthUserDataLazyQueryHookResult = ReturnType<typeof useGetAuthUserDataLazyQuery>;
export type GetAuthUserDataQueryResult = Apollo.QueryResult<GetAuthUserDataQuery, GetAuthUserDataQueryVariables>;
export const VhLastSeenDocument = gql`
    mutation vhLastSeen($data: json!) {
  insert_vh_last_seen_one(
    object: {data: $data}
    on_conflict: {constraint: vh_last_seen_user_id_key, update_columns: data}
  ) {
    id
    user_id
    data
    created_at
    updated_at
  }
}
    `;
export type VhLastSeenMutationFn = Apollo.MutationFunction<VhLastSeenMutation, VhLastSeenMutationVariables>;

/**
 * __useVhLastSeenMutation__
 *
 * To run a mutation, you first call `useVhLastSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVhLastSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [vhLastSeenMutation, { data, loading, error }] = useVhLastSeenMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useVhLastSeenMutation(baseOptions?: Apollo.MutationHookOptions<VhLastSeenMutation, VhLastSeenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VhLastSeenMutation, VhLastSeenMutationVariables>(VhLastSeenDocument, options);
      }
export type VhLastSeenMutationHookResult = ReturnType<typeof useVhLastSeenMutation>;
export type VhLastSeenMutationResult = Apollo.MutationResult<VhLastSeenMutation>;
export type VhLastSeenMutationOptions = Apollo.BaseMutationOptions<VhLastSeenMutation, VhLastSeenMutationVariables>;
export const ListProjectsDocument = gql`
    query ListProjects {
  projects(order_by: {updated_at: desc}) {
    id
    title
    type
    owner {
      id
      first_name
      last_name
      avatar
    }
    organization {
      id
      name
    }
    created_at
    updated_at
    deleted_at
  }
}
    `;

/**
 * __useListProjectsQuery__
 *
 * To run a query within a React component, call `useListProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ListProjectsQuery, ListProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListProjectsQuery, ListProjectsQueryVariables>(ListProjectsDocument, options);
      }
export function useListProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListProjectsQuery, ListProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListProjectsQuery, ListProjectsQueryVariables>(ListProjectsDocument, options);
        }
export type ListProjectsQueryHookResult = ReturnType<typeof useListProjectsQuery>;
export type ListProjectsLazyQueryHookResult = ReturnType<typeof useListProjectsLazyQuery>;
export type ListProjectsQueryResult = Apollo.QueryResult<ListProjectsQuery, ListProjectsQueryVariables>;
export const GetProjectDocument = gql`
    query GetProject($id: uuid!) {
  projects_by_pk(id: $id) {
    id
    title
    takeoff_file
    organization {
      id
      name
    }
  }
}
    `;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const InsertProjectDocument = gql`
    mutation InsertProject($project: projects_insert_input!) {
  insert_projects_one(object: $project) {
    id
    title
  }
}
    `;
export type InsertProjectMutationFn = Apollo.MutationFunction<InsertProjectMutation, InsertProjectMutationVariables>;

/**
 * __useInsertProjectMutation__
 *
 * To run a mutation, you first call `useInsertProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertProjectMutation, { data, loading, error }] = useInsertProjectMutation({
 *   variables: {
 *      project: // value for 'project'
 *   },
 * });
 */
export function useInsertProjectMutation(baseOptions?: Apollo.MutationHookOptions<InsertProjectMutation, InsertProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertProjectMutation, InsertProjectMutationVariables>(InsertProjectDocument, options);
      }
export type InsertProjectMutationHookResult = ReturnType<typeof useInsertProjectMutation>;
export type InsertProjectMutationResult = Apollo.MutationResult<InsertProjectMutation>;
export type InsertProjectMutationOptions = Apollo.BaseMutationOptions<InsertProjectMutation, InsertProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($pk: projects_pk_columns_input!, $project: projects_set_input!) {
  update_projects_by_pk(pk_columns: $pk, _set: $project) {
    id
    title
    updated_at
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      pk: // value for 'pk'
 *      project: // value for 'project'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const SoftDeleteProjectDocument = gql`
    mutation SoftDeleteProject($pk: projects_pk_columns_input!) {
  update_projects_by_pk(pk_columns: $pk, _set: {deleted_at: "now()"}) {
    id
    deleted_at
  }
}
    `;
export type SoftDeleteProjectMutationFn = Apollo.MutationFunction<SoftDeleteProjectMutation, SoftDeleteProjectMutationVariables>;

/**
 * __useSoftDeleteProjectMutation__
 *
 * To run a mutation, you first call `useSoftDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSoftDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [softDeleteProjectMutation, { data, loading, error }] = useSoftDeleteProjectMutation({
 *   variables: {
 *      pk: // value for 'pk'
 *   },
 * });
 */
export function useSoftDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<SoftDeleteProjectMutation, SoftDeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SoftDeleteProjectMutation, SoftDeleteProjectMutationVariables>(SoftDeleteProjectDocument, options);
      }
export type SoftDeleteProjectMutationHookResult = ReturnType<typeof useSoftDeleteProjectMutation>;
export type SoftDeleteProjectMutationResult = Apollo.MutationResult<SoftDeleteProjectMutation>;
export type SoftDeleteProjectMutationOptions = Apollo.BaseMutationOptions<SoftDeleteProjectMutation, SoftDeleteProjectMutationVariables>;
export const ListUsersDocument = gql`
    query ListUsers {
  users {
    id
    first_name
    last_name
    email
    avatar
  }
}
    `;

/**
 * __useListUsersQuery__
 *
 * To run a query within a React component, call `useListUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListUsersQuery(baseOptions?: Apollo.QueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, options);
      }
export function useListUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, options);
        }
export type ListUsersQueryHookResult = ReturnType<typeof useListUsersQuery>;
export type ListUsersLazyQueryHookResult = ReturnType<typeof useListUsersLazyQuery>;
export type ListUsersQueryResult = Apollo.QueryResult<ListUsersQuery, ListUsersQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: uuid!) {
  users_by_pk(id: $id) {
    id
    first_name
    last_name
    email
    avatar
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($pk: users_pk_columns_input!, $user: users_set_input!) {
  update_users_by_pk(pk_columns: $pk, _set: $user) {
    id
    updated_at
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      pk: // value for 'pk'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;