const dragOver = (e) => {
  e.preventDefault();
};

const drop = (e) => {
  e.preventDefault();
  const imageFile = e.dataTransfer.files[0];
  let reader = new FileReader();
  let dropArea = document.querySelector('.dropArea');
  let gridArea = document.querySelector('.gridArea');
  let imageTag = new Image();

  reader.onload = (() => {
    return function(e) {
      imageTag.src = this.result;
      let cellWidth = imageTag.width / 10;
      let cellHeight = imageTag.height / 10;
      let cellPositionX = 0;
      let cellPositionY = 0;
      gridArea.style = `width: ${imageTag.width + (2 * cellWidth)}px;`;

      for (let i = 0; i < 10; i += 1) {  // rows
        for (let j = 0; j < 10; j += 1) {  // cells
          let gridImage = document.createElement('div');
          gridImage.style = `
          width: ${cellWidth}px;
          height: ${cellHeight}px;
          background: url(${this.result}) ${cellPositionX}px ${cellPositionY}px;
          background-repeat: no-repeat;
          `;
          gridArea.appendChild(gridImage);
          cellPositionX -= cellWidth;
        }
        cellPositionY -= cellHeight;
        cellPositionX = 0;
      };
      dropArea.appendChild(imageTag);
    }
  })();

  reader.readAsDataURL(imageFile);
};
