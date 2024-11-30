export interface ErrorResponseModel {
  status?: number;
  title?: string;
  type?: string;
  errors?: ErrorItem[];
}

interface ErrorItem {
  field?: string;
  code?: string;
  description?: string;
  type?: number;
}