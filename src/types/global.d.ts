export {}
declare global {
    interface formDetails {
      title: string;
      description: string;
      priority: string;
      category: string;
      name: string;
      mobile: string;
      date: Date;
    //  files: File[];
    }

    type ZodErrorResponse = {
      _errors?: string[];
      [key: string]: { _errors: string[] } | any;
    };

   interface errorData{
      field: string;
      message: string;

   }
interface successResponse{
  message:string 
}

  }