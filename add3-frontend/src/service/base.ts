export const baseProperties = {
  server_url: "http://localhost:3000/api",
  getOptions: (verb: "GET" | "POST", data: Record<any, any> | null = null) => {
    const options: any  = {
      dataType: "json",
      method: verb,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      } ,
    };
    if (data) {
      options.body  = JSON.stringify(data);
    }
    return options;
  },
};
