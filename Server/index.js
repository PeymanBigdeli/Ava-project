import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

import path from "path"
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

app.get('/api/requests/', async (req, res) => {
  try {
    const token = req.headers['authorization'];

    const apiResponse = await fetch('https://harf.roshan-ai.ir/api/requests/', {
      headers: {
        Authorization: token,
      }
    });

    const data = await apiResponse.json();
    res.status(apiResponse.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy server failed' });
  }
});


app.post("/api/transcribe_files/" , async (req , res) => {
  try {
    const token = req.headers["authorization"];

    const apiResponse = await fetch("https://harf.roshan-ai.ir/api/transcribe_files/" , {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const result = await apiResponse.json();
    res.status(apiResponse.status).json(result);
  }
  catch(err) {
    console.error("Proxy error: " , err);
    res.status(500).json({error: "Proxy server failed"});
  }
})




app.delete("/api/requests/:id/" , async (req , res) => {
  try {
    const token = req.headers["authorization"];
    const {id} = req.params;

    const apiResponse = await fetch(`https://harf.roshan-ai.ir/api/requests/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      }
    });
    if(!apiResponse.ok) throw new Error("Could not delete from the server. Maybe try after refreshing the page");
    res.status(204).json(`Delete on item with id ${id} successful`);
  }
  catch(err) {
    console.error(err);
    res.status(500).json({error: "Proxy server failed"})
  }
})


app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});