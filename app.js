const express = require('express');
const app = express();
app.use(express.json());

// Impor instance Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

// Rute untuk mendapatkan status server
app.get('/status', (request, response) => {
  const status = { Status: 'Running' };
  response.send(status);
});

// Rute untuk mendapatkan semua astronaut
app.get('/astronauts', async (request, response) => {
  try {
    const astronauts = await prisma.astronaut.findMany();
    response.json(astronauts);
  } catch (error) {
    response.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Rute untuk mendapatkan astronaut yang saat ini berada di luar angkasa
app.get('/astronauts/current', async (request, response) => {
  try {
    const currentAstronauts = await prisma.astronaut.findMany({
      where: {
        isInSpace: true,//
      },
    });
    response.json(currentAstronauts);
  } catch (error) {
    response.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Rute untuk membuat astronaut baru
app.post('/astronauts', async (request, response) => {
    try {
      console.log('Permintaan POST diterima:', request.body);
      const { nama, kebangsaan, isInSpace } = request.body;
      
      // ... validasi data dan kode lainnya
      
      const newAstronaut = await prisma.astronaut.create({
        data: {
          nama,
          kebangsaan,
          isInSpace: isInSpace || false,
        },
      });
      
      console.log('Data astronaut baru:', newAstronaut);
      response.json(newAstronaut);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Terjadi kesalahan server' });
    }
  });

// Rute untuk memperbarui astronaut
app.put('/astronauts/:id', async (request, response) => {
  try {
    const updatedAstronaut = await prisma.astronaut.update({
      where: {
        id: parseInt(request.params.id),
      },
      data: request.body,
    });
    response.json(updatedAstronaut);
  } catch (error) {
    response.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

// Rute untuk menghapus astronaut
app.delete('/astronauts/:id', async (request, response) => {
  try {
    const deletedAstronaut = await prisma.astronaut.delete({
      where: {
        id: parseInt(request.params.id),
      },
    });
    response.json(deletedAstronaut);
  } catch (error) {
    response.status(500).json({ error: 'Terjadi kesalahan server' });
  }
});

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});