export const postRequest = (payload: any) => {    
      return {
          method : 'POST',
          headers : {
            'Content-Type' : "application/json"
          },
          body: JSON.stringify(payload),
          };    
  }