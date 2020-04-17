import fs from 'fs';
const regex = /<[/\/html|body|head>]*>/g;

const cleanFiles = async () => {
  fs.readdir(__dirname + '/build', 'utf8', (err, files) => {
    const htmlFiles = files.filter((file) => file.indexOf('.html') > 0);

    for (const file of htmlFiles) {
      cleanFile(file);
    }
  });
};

const cleanFile = async (file) => {
  const fileHTML = await getFileHTML(file);
  const updatedHTML = updateHTML(fileHTML, file);

  if (updatedHTML === undefined) {
    console.log(file + ' already clean');
    return;
  }

  await replaceFileContent(updatedHTML, file);
};

const getFileHTML = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/build/' + file, 'utf8', (err, content) => {
      if (err) {
        reject(err);
      }
      resolve(content);
    });
  });
};

const updateHTML = (html, file) => {
  const found = html.match(regex);
  const isClean = found === null || !found.length;

  if (isClean) {
    console.log('no updates required');
    return;
  }

  let updatedHTML = html;

  found.forEach((item) => {
    updatedHTML = updatedHTML.replace(item, '');
  });

  return updatedHTML;
};

const replaceFileContent = (html, file) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(__dirname + '/build/' + file, html, 'utf8', (err) => {
      if (err) {
        console.log('Error when writing ' + file, file);
        reject(err);
      }

      resolve(file, ' updated');
    });
  });
};

cleanFiles();
