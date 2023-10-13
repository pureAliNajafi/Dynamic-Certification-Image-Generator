console.log("Sdad");
const getName = prompt("please enter a name");
const generateCertImage = (userName) => {
  const Loading = document.getElementById("Loading");
  const canvas = document.getElementById("canvas");
  const link = document.getElementById("link");
  const image = new Image();
  image.onload = function () {
    Loading.style.display = "none";
    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#2d2e31";
    ctx.textAlign = "center"; // center the text

    const maxWidth = canvas.width - 165; // adjust the maximum text width according to your design
    let fontSize = 100;
    let lines = [];
    while (fontSize > 0) {
      // loop until the font size is too small
      ctx.font = `${fontSize}px Arial`;
      const words = userName.split(" ");
      let line = "";
      for (let word of words) {
        const testLine = line ? `${line} ${word}` : word;
        const testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth) {
          lines.push(line);
          line = word;
        } else {
          line = testLine;
        }
      }
      lines.push(line);
      if (lines.length <= 2) {
        break; // stop if we can fit the text into 2 lines
      } else {
        lines = [];
        fontSize--; // decrease the font size and try again
      }
    }

    const lineHeight = Math.floor(fontSize * 1.2); // adjust the line height according to your design
    const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;
    for (let i in lines) {
      const y = startY + i * lineHeight;
      ctx.fillText(lines[i], canvas.width / 2, y + 34);
    }

    link.download = `${userName}-Certification.png`;
    link.href = canvas.toDataURL("image/png");
  };
  image.crossOrigin = "anonymous";
  image.src =
    "https://png.pngtree.com/background/20210706/original/pngtree-certificate-background-design-picture-image_132223.jpg";
};
generateCertImage(getName);
