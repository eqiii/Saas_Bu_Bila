// index.js
const { loadTodos, saveTodos } = require('./utils');

const command = process.argv[2];
const input = process.argv.slice(3).join(' ');

switch (command) {
  case 'list':
    const todos = loadTodos();
    if (todos.length === 0) {
      console.log('Belum ada daftar belanja.');
    } else {
      console.log('Daftar belanja:');
      todos.forEach((todo, i) => console.log(`${i + 1}. ${todo}`));
    }
    break;

  case 'add':
    if (!input) {
      console.log('Masukkan daftar yang ingin ditambahkan.');
      break;
    }
    const newTodos = loadTodos();
    newTodos.push(input);
    saveTodos(newTodos);
    console.log(`Berhasil menambahkan daftar belanja: "${input}"`);
    break;

  case 'remove':
    const indexx = parseInt(input) - 1;
    const currentTodos = loadTodos();
    if (isNaN(indexx) || indexx < 0 || indexx >= currentTodos.length) {
      console.log('Nomor daftar tidak valid.');
    } else {
      const removed = currentTodos.splice(indexx, 1);
      saveTodos(currentTodos);
      console.log(`Berhasil menghapus: "${removed[0]}"`);
    }
    break;

    case 'update': {
  const args = process.argv.slice(2); // pastikan ini ada kalau di luar belum
  const index = parseInt(args[1]);
  const updatedText = args.slice(2).join(' ');
  const todosToUpdate = loadTodos();

  if (!todosToUpdate.length) {
    console.log('Belum ada dafar yang bisa diperbarui.');
    break;
  }

  if (isNaN(index) || index < 0 || index >= todosToUpdate.length) {
    console.log('Index tidak valid.');
    break;
  }

  if (!updatedText) {
    console.log('Masukkan daftar baru yang ingin diperbarui.');
    break;
  }

  const oldTodo = todosToUpdate[index];
  todosToUpdate[index] = updatedText;
  saveTodos(todosToUpdate);
  console.log(`Berhasil mengubah dafar ke-${index} dari "${oldTodo}" menjadi "${updatedText}"`);
  break;
}



  default:
    console.log(`Perintah tidak dikenal. Gunakan:
  - node index.js list         → Lihat daftar belanja
  - node index.js add [task]   → Tambah daftar belanja
  - node index.js update [index] [new task] → Ubah daftar belanja
  - node index.js remove [no]  → Hapus daftar belanja`);
}