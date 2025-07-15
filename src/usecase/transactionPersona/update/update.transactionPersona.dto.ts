export interface InputUpdateTransactionPersonaDto {
  id: string;
  name?: string;
  image_url?: string;
}

export interface OutputUpdateTransactionPersonaDto {
  id: string;
  image_url: string;
  name: string;
}
