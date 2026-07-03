const canvas = document.getElementById('canvasSettingsPreview')
const ctx = canvas.getContext('2d');

let innerContentWidth = 353;
let innerContentHeight = 400;

let borderTextureDims = { w: 18, h: 33 }

let borderLeft = 8;
let borderRight = 8;
let borderTop = 23;
let borderBottom = 8;

canvas.width = borderLeft + innerContentWidth + borderRight;
canvas.height = borderTop + innerContentHeight + borderBottom;

borderTexture = new Image();
borderTexture.src = '../Assets/dialog_background_hollow_3.png';

ctx.imageSmoothingEnabled = false;

function drawContainerBorder() {
  // Top Left Corner
  ctx.drawImage(borderTexture,
    0, 0,
    borderLeft, borderTop,
    0, 0,
    borderLeft, borderTop
  );
  // Top Right Corner
  ctx.drawImage(borderTexture,
    borderTextureDims.w - borderRight, 0,
    borderRight, borderTop,
    canvas.width - borderRight, 0,
    borderRight, borderTop
  );
  // Bottom Left Corner
  ctx.drawImage(borderTexture,
    0, borderTextureDims.h - borderBottom,
    borderLeft, borderBottom,
    0, canvas.height - borderBottom,
    borderLeft, borderBottom
  );
  // Top Right Corner
  ctx.drawImage(borderTexture,
    borderTextureDims.w - borderRight, borderTextureDims.h - borderBottom,
    borderRight, borderBottom,
    canvas.width - borderRight, canvas.height - borderBottom,
    borderRight, borderBottom
  );
  // Left Side
  ctx.drawImage(borderTexture,
    0, borderTop,
    borderLeft, borderTextureDims.h - borderTop - borderBottom,
    0, borderTop,
    borderLeft, canvas.height - borderTop - borderBottom
  );
  // Right Side
  ctx.drawImage(borderTexture,
    borderTextureDims.w - borderRight, borderTop,
    borderRight, borderTextureDims.h - borderTop - borderBottom,
    canvas.width - borderRight, borderTop,
    borderRight, canvas.height - borderTop - borderBottom
  );
  // Top Side
  ctx.drawImage(borderTexture,
    borderLeft, 0,
    borderTextureDims.w - borderLeft - borderRight, borderTop,
    borderLeft, 0,
    canvas.width - borderLeft - borderRight, borderTop
  );
  // Bottom Side
  ctx.drawImage(borderTexture,
    borderLeft, borderTextureDims.h - borderBottom,
    borderTextureDims.w - borderLeft - borderRight, borderBottom,
    borderLeft, canvas.height - borderBottom,
    canvas.width - borderLeft - borderRight, borderBottom
  );
  // Middle
  ctx.drawImage(borderTexture,
    borderLeft, borderTop,
    borderTextureDims.w - borderLeft - borderRight,
    borderTextureDims.h - borderTop - borderBottom,
    borderLeft, borderTop,
    canvas.width - borderLeft - borderRight,
    canvas.height - borderTop - borderBottom
  );
}

function resizeCanvas(canvas, multiplier) {
  intMultiplier = Math.round(multiplier);

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.imageSmoothingEnabled = false;
  tempCanvas.width = canvasWidth * intMultiplier;
  tempCanvas.height = canvasHeight * intMultiplier;

  tempCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, tempCanvas.width, tempCanvas.height)

  canvas.width = tempCanvas.width;
  canvas.height = tempCanvas.height;

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
}

borderTexture.onload = function () {
  drawContainerBorder()
  resizeCanvas(canvas, 2)
  // ctx.font = "10px Mojangles";
  // ctx.fillStyle = 'red'
  // ctx.fillText("The cloud",0 - 0.25,80);
  let t;
  t = 'The cloud density changes when'
  draw_text_on_canvas(ctx, '20px Mojangles', t, '#ff0000', [14, 33])
  t = 'This is cool as heck bro!'
  draw_text_on_canvas(ctx, 'italic 20px Mojangles', t, '#ffff00', [14, 33 + 10])
}

function draw_text_on_canvas(context, font, text, hexcolor, [x, y]) {
  var red = parseInt(hexcolor.slice(1, 3), 16),
    green = parseInt(hexcolor.slice(3, 5), 16),
    blue = parseInt(hexcolor.slice(5, 7), 16);

  const temp_canvas = document.createElement('canvas');
  const temp_context = temp_canvas.getContext('2d', { willReadFrequently: true });

  temp_context.font = font;
  const metrics = temp_context.measureText(text);

  const fontSizeMatch = font.match(/(\d+(?:\.\d+)?)px/);
  const font_size = fontSizeMatch ? parseFloat(fontSizeMatch[1]) : 10;

  temp_canvas.width = Math.ceil(metrics.width) + 2;
  temp_canvas.height = Math.ceil(font_size * 1.5);
  const baseline_y = Math.ceil(font_size);

  if (temp_canvas.width <= 0 || temp_canvas.height <= 0) return;

  temp_context.font = font;
  temp_context.fillStyle = 'black';
  temp_context.textRendering = 'geometricPrecision';
  temp_context.fillText(text, 0.8745, baseline_y);

  const image_data = temp_context.getImageData(0, 0, temp_canvas.width, temp_canvas.height);
  const pixels = image_data.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const alpha = pixels[i + 3];

    if (alpha < 200) {
      pixels[i + 3] = 0;
    }

    else {
      pixels[i] = red;
      pixels[i + 1] = green;
      pixels[i + 2] = blue;
      pixels[i + 3] = 255;
    }
  }

  const final_x = x - 1;
  const final_y = y - baseline_y;

  temp_context.putImageData(image_data, 0, 0)
  context.drawImage(temp_canvas, final_x, final_y)
  temp_canvas.remove()
}