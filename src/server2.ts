import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser'; // Use to tap into the response !
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import { dirname } from 'path';

(async () => {

  // Init the Express application
  const app = express();
  // Set the network port
  const port = process.env.PORT || 8082;
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get("/filteredimage", async function (request: Request, response : Response) {
  
    console.log('---------------response-------------------');
    // console.log(request.body);
    console.log("-----------------Tapping in to the url -----------------");
    // console.log(request.query);
    let image_url= request.query.image_url;

    if (image_url != "") {
      console.log(__dirname);
      let resultingImage = await filterImageFromURL(image_url);
      response.status(400).sendFile(resultingImage);
    }

    else {
      return response.send("Your url is simply not available");
    }
  });

  // Root Endpoint 
  // Displays a simple message to the user
  app.get("/", function (req, res) {
    console.log(__dirname);
    res.send("try GET /filteredimage?image_url={{}}")
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();




