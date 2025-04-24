function createGPickerAndTrigger(event, colors, swatches) {
  const gpickr = new GPickr({
    el: event,
    stops: [
      ["rgb(0,0,0)", 0],
      ["rgb(255,136,230)", 1],
    ],
    swatches,
  });

  return gpickr;
}

function handleGPicker(event, colors, onChangeCallback) {
  const swatches = ["red", "blue"];
  let picker = createGPickerAndTrigger(
    event.target.parentElement,
    colors,
    swatches
  );

  const x = event.clientX;
  const y = event.clientY;

  picker.show(x, y);

  picker.on("change", (color, source, instance) => {
    onChangeCallback(color);
  });

  picker.on("hide", (instance) => {
    instance.destroy();
  });
}

function handlePicker(e, currentColor, opacity, onChangeCallback) {
  let picker = this.createPickerAndTrigger(
    e.target.parentElement,
    currentColor,
    opacity
  );

  picker.show();

  picker.on("change", (color, source, instance) => {
    onChangeCallback(color);
  });

  picker.on("hide", (instance) => {
    instance.destroyAndRemove();
    // this.removePicker(instance);
  });

  // this.pickers.push(picker);
}

function createPickerAndTrigger(parent, color, opacity) {
  const swatches = ["red", "blue"];

  let _triggerEl = document.createElement("div");
  _triggerEl.className = "skinner_picker_trigger_hide";
  parent.appendChild(_triggerEl);

  let _picker = GPickr.Pickr.create({
    el: _triggerEl,
    theme: "nano",
    comparison: false,
    container: parent,
    default: color,
    swatches: swatches,
    components: {
      preview: false,
      hue: true,
      opacity: opacity,
      interaction: {
        //hex: false,
        input: true,
      },
    },
  });

  return _picker;
}

const trigger = document.querySelector(".trigger");
const trigger2 = document.querySelector(".trigger.trigger2");

trigger.addEventListener("click", (event) => {
  handleGPicker(event, [], (inst) => {
    document.body.style.background = inst.getGradient();
  });
});

trigger2.addEventListener("click", (event) => {
  handlePicker(event, "red", true, (color) => {
    trigger2.style.background = color.toHEXA().toString();
  });
});
