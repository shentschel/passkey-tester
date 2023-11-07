export interface ApiError {
  title?: string;
  details?: string;
  status?: string;
  additional: Map<string, string>
}

