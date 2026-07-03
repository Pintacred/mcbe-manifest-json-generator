// HEADER/MODULES
const defaultValuePackname = "";
const defaultValuePackdesc = "";
const defaultValueVerA = 0;
const defaultValueVerB = 0;
const defaultValueVerC = 1;
const defaultValueMEVA = 1;
const defaultValueMEVB = 26;
const defaultValueMEVC = 10;
// CAPABILITIES
const defaultValuePBR = true;
const defaultValueExpCustUI = false;
const defaultValueRaytraced = false;
const defaultValueChem = false;
const defaultValueEditorExt = false;
// METADATA
const defaultValueAuthors = "";
const defaultValueWebURL = "";
// SUBPACK
const defaultValueSubpack = [];
// SETTINGS
const defaultValueSettings = [];

// HEADER/MODULES
let valuePackname;
let valuePackdesc;
let valueVerA;
let valueVerB;
let valueVerC;
let valueMEVA;
let valueMEVB;
let valueMEVC;
// CAPABILITIES
let valuePBR;
let valueExpCustUI;
let valueRaytraced;
let valueChem;
let valueEditorExt;
// METADATA
let valueAuthors;
let valueWebURL;
// SUBPACK
let valueSubpack = [];
// SETTINGS
let valueSettings = [];

function resetValueToDefault() {
  // HEADER/MODULES
  valuePackname = defaultValuePackname;
  valuePackdesc = defaultValuePackdesc;
  valueVerA = defaultValueVerA;
  valueVerB = defaultValueVerB;
  valueVerC = defaultValueVerC;
  valueMEVA = defaultValueMEVA;
  valueMEVB = defaultValueMEVB;
  valueMEVC = defaultValueMEVC;
  // CAPABILITIES
  valuePBR = defaultValuePBR;
  valueExpCustUI = defaultValueExpCustUI;
  valueRaytraced = defaultValueRaytraced;
  valueChem = defaultValueChem;
  valueEditorExt = defaultValueEditorExt;
  // METADATA
  valueAuthors = defaultValueAuthors;
  valueWebURL = defaultValueWebURL;
  // SUBPACK
  valueSubpack = [];
  // SETTINGS
  valueSettings = [];
}
resetValueToDefault()

// HEADER/MODULES
const fieldPackname = document.getElementById("packname");
const fieldPackdesc = document.getElementById("packdesc");
const fieldVerA = document.getElementById("versionA");
const fieldVerB = document.getElementById("versionB");
const fieldVerC = document.getElementById("versionC");
const fieldMEVA = document.getElementById("minEngineVerA");
const fieldMEVB = document.getElementById("minEngineVerB");
const fieldMEVC = document.getElementById("minEngineVerC");
// CAPABILITIES
const fieldPBR = document.getElementById("pbr");
const fieldExpCustUI = document.getElementById("expCustUI");
const fieldRaytraced = document.getElementById("raytraced");
const fieldChem = document.getElementById("chem");
const fieldEditorExt = document.getElementById("editExt");
// METADATA
const fieldAuthors = document.getElementById("authors");
const fieldWebURL = document.getElementById("metadataWebsiteURL");

function putValuesToFields() {
  // HEADER/MODULES
  fieldPackname.value = valuePackname;
  fieldPackdesc.value = valuePackdesc;
  fieldVerA.value = valueVerA;
  fieldVerB.value = valueVerB;
  fieldVerC.value = valueVerC;
  fieldMEVA.value = valueMEVA;
  fieldMEVB.value = valueMEVB;
  fieldMEVC.value = valueMEVC;
  // CAPABILITIES
  fieldPBR.checked = valuePBR;
  fieldExpCustUI.checked = valueExpCustUI;
  fieldRaytraced.checked = valueRaytraced;
  fieldChem.checked = valueChem;
  fieldEditorExt.checked = valueEditorExt;
  // METADATA
  fieldAuthors.value = valueAuthors
  fieldWebURL.value = valueWebURL
}
putValuesToFields()

function changeValuesToFields() {
  valuePackname = fieldPackname.value;
  valuePackdesc = fieldPackdesc.value;

  valueVerA = fieldVerA.value;
  valueVerB = fieldVerB.value;
  valueVerC = fieldVerC.value;

  valueMEVA = fieldMEVA.value;
  valueMEVB = fieldMEVB.value;
  valueMEVC = fieldMEVC.value;

  valuePBR = fieldPBR.checked ? true : false;
  valueExpCustUI = fieldExpCustUI.checked ? true : false;
  valueRaytraced = fieldRaytraced.checked ? true : false;
  valueChem = fieldChem.checked ? true : false;
  valueEditorExt = fieldEditorExt.checked ? true : false;

  valueAuthors = fieldAuthors.value
  valueWebURL = fieldWebURL.value
}


// Import Feature
const importFileBtn = document.getElementById("importFile");

importFileBtn.addEventListener("change", async function () {
  const manifestJsonFile = await getFile(importFileBtn);

  resetValueToDefault()
  const subpacksDiv = document.getElementById('subpacksDiv')
  while (subpacksDiv.firstChild) subpacksDiv.removeChild(subpacksDiv.firstChild);
  const settingsDiv = document.getElementById('settingsDiv')
  while (settingsDiv.firstChild) settingsDiv.removeChild(settingsDiv.firstChild);

  valuePackname = manifestJsonFile.header.name;
  valuePackdesc = manifestJsonFile.header.description;

  const GEOMETRYDASH = manifestJsonFile.header.uuid

  const ver = manifestJsonFile.header.version.split(".")
  valueVerA = ver[0];
  valueVerB = ver[1];
  valueVerC = ver[2];
  const minEngVer = manifestJsonFile.header.min_engine_version.split(".")
  valueMEVA = minEngVer[0];
  valueMEVB = minEngVer[1];
  valueMEVC = minEngVer[2];

  const authorsArray = manifestJsonFile.metadata?.authors;
  if (authorsArray) {
    const authorsString = authorsArray.join("\n")
    valueAuthors = authorsString;
  }

  const weburl = manifestJsonFile.metadata?.url;
  if (weburl) {
    valueWebURL = weburl;
  }

  const capabs = manifestJsonFile.capabilities

  valuePBR = capabs.includes("pbr");
  valueExpCustUI = capabs.includes("experimental_custom_ui");
  valueRaytraced = capabs.includes("raytraced");
  valueChem = capabs.includes("chemistry");
  valueEditorExt = capabs.includes("editorExtension");

  valueSubpack = manifestJsonFile?.subpacks;
  if (valueSubpack) {
    for (let i = 0; i < valueSubpack.length; i++) {
      const newSubpack = createGenericInputFieldDiv(createSubpackInputField);

      subpacksDiv.appendChild(newSubpack);

      // Get the inputs inside this newly created subpack
      const desc = newSubpack.querySelector('.subpackDescription');
      const folder = newSubpack.querySelector('.subpackFolderName');
      const tier = newSubpack.querySelector('.subpackMemoryTier');

      // Fill them with imported data
      desc.value = valueSubpack[i].name ?? '';
      folder.value = valueSubpack[i].folder_name ?? '';
      tier.value = valueSubpack[i].memory_performance_tier ?? 0;
    }
  }

  valueSettings = manifestJsonFile?.settings;
  if (valueSettings) {
    for (let i = 0; i < valueSettings.length; i++) {
      const newSettings = createGenericInputFieldDiv(createSettingsInputField);

      settingsDiv.appendChild(newSettings);

      // Get the inputs inside this newly created settings
      const type = newSettings.querySelector('.settingsType');
      const text = newSettings.querySelector('.textLTS');
      const name = newSettings.querySelector('.nameXTS');
      const min = newSettings.querySelector('.minXXS');
      const max = newSettings.querySelector('.maxXXS');
      const step = newSettings.querySelector('.stepXXS');
      const defNum = newSettings.querySelector('.defaultXXS');
      const defBool = newSettings.querySelector('.defaultXTX');

      // Fill them with imported data
      type.value = valueSettings[i].type ?? 'toggle';
      text.value = valueSettings[i].text ?? '';
      name.value = valueSettings[i].name ?? '';
      min.value = valueSettings[i].min ?? 0;
      max.value = valueSettings[i].max ?? 0;
      step.value = valueSettings[i].step ?? 0;
      if (type.value == "label") {
        defNum.value = 0;
        defBool.value = false;
      }
      if (type.value == "toggle") {
        defNum.value = 0;
        defBool.value = valueSettings[i].default ?? '';
      } else if (type.value == "slider") {
        defNum.value = valueSettings[i].default ?? 0;
        defBool.value = '';
      }
      type.dispatchEvent(new Event('change')); // update the ui
    }
  }

  putValuesToFields()
  refreshAll()
});

async function getFile(fileInput) {
  try {
    const file = fileInput.files[0];
    console.log("Successfully imported!");
    return await new Response(file).json();
  } catch (err) {
    console.error("File is not valid JSON", err);
    return null;
  }
}

// ===============================================================================================================

function createSubpackInputField() {
  const divForMainSubpackInputs = document.createElement('div');
  divForMainSubpackInputs.className = 'divForMainSubpackInputs';

  const labelDesc = document.createElement('label');
  labelDesc.htmlFor = 'subpackDescription';
  labelDesc.textContent = 'Subpack Title/Description: ';
  const textareaDesc = document.createElement('textarea');
  textareaDesc.className = 'subpackDescription';
  textareaDesc.rows = '3';
  textareaDesc.style.width = '85%';

  const labelFolder = document.createElement('label');
  labelFolder.htmlFor = 'subpackFolderName';
  labelFolder.textContent = 'Subpack Folder Name: ';
  const inputFolder = document.createElement('input');
  inputFolder.type = 'text';
  inputFolder.className = 'subpackFolderName';
  inputFolder.style.width = '85%';
  inputFolder.placeholder = 'folder_name'

  const labelTier = document.createElement('label');
  labelTier.htmlFor = 'subpackMemoryTier';
  labelTier.textContent = 'Memory Performance Tier: ';
  const inputTier = document.createElement('input');
  inputTier.type = 'number';
  inputTier.className = 'subpackMemoryTier';
  inputTier.size = '3';
  inputTier.min = '0';
  inputTier.value = '0';

  divForMainSubpackInputs.appendChild(labelDesc);
  divForMainSubpackInputs.appendChild(document.createElement('br'));
  divForMainSubpackInputs.appendChild(textareaDesc);
  divForMainSubpackInputs.appendChild(document.createElement('br'));
  divForMainSubpackInputs.appendChild(document.createElement('br'));
  divForMainSubpackInputs.appendChild(labelFolder);
  divForMainSubpackInputs.appendChild(document.createElement('br'));
  divForMainSubpackInputs.appendChild(inputFolder);
  divForMainSubpackInputs.appendChild(document.createElement('br'));
  divForMainSubpackInputs.appendChild(document.createElement('br'));
  divForMainSubpackInputs.appendChild(labelTier);
  divForMainSubpackInputs.appendChild(inputTier);

  return divForMainSubpackInputs;
}

function createSettingsInputField() {
  const divForMainSetingsInputs = document.createElement('div');
  divForMainSetingsInputs.className = 'divForMainSettingsInputs';

  // Type
  const labelForType = document.createElement('label')
  labelForType.htmlFor = 'settingsType';
  labelForType.textContent = 'Type: ';
  const settingsType = document.createElement('select')
  settingsType.className = 'settingsType';
  const optionLabel = document.createElement('option')
  optionLabel.value = 'label';
  optionLabel.innerHTML = 'Label';
  const optionToggle = document.createElement('option')
  optionToggle.value = 'toggle';
  optionToggle.innerHTML = 'Toggle';
  const optionSlider = document.createElement('option')
  optionSlider.value = 'slider';
  optionSlider.innerHTML = 'Slider';

  settingsType.appendChild(optionLabel);
  settingsType.appendChild(optionToggle);
  settingsType.appendChild(optionSlider);

  // text_LTS
  const labelTextLTS = document.createElement('label');
  labelTextLTS.htmlFor = 'textLTS';
  labelTextLTS.textContent = 'Text: ';
  const textLTS = document.createElement('textarea');
  textLTS.className = 'textLTS';
  textLTS.style.width = '85%';
  textLTS.rows = '3';

  // name_XTS
  const labelNameXTS = document.createElement('label');
  labelNameXTS.htmlFor = 'nameXTS';
  labelNameXTS.textContent = 'Name: ';
  const nameXTS = document.createElement('input'); nameXTS.type = 'text';
  nameXTS.className = 'nameXTS';
  nameXTS.placeholder = 'space:name';
  nameXTS.style.width = '85%';

  // min_XXS
  const labelMinXXS = document.createElement('label');
  labelMinXXS.htmlFor = 'minXXS';
  labelMinXXS.textContent = 'Min: ';
  const minXXS = document.createElement('input'); minXXS.type = 'number';
  minXXS.className = 'minXXS';
  minXXS.size = 2;
  minXXS.value = 0;

  // max_XXS
  const labelMaxXXS = document.createElement('label');
  labelMaxXXS.htmlFor = 'maxXXS';
  labelMaxXXS.textContent = 'Max: ';
  const maxXXS = document.createElement('input'); maxXXS.type = 'number';
  maxXXS.className = 'maxXXS';
  maxXXS.size = 2;
  maxXXS.value = 10;

  // step_XXS
  const labelStepXXS = document.createElement('label');
  labelStepXXS.htmlFor = 'stepXXS';
  labelStepXXS.textContent = 'Step:';
  const stepXXS = document.createElement('input'); stepXXS.type = 'number';
  stepXXS.className = 'stepXXS';
  stepXXS.size = 2;
  stepXXS.value = 1;

  // default_XXS
  const labelDefaultXXS = document.createElement('label');
  labelDefaultXXS.htmlFor = 'defaultXXS';
  labelDefaultXXS.textContent = 'Default: ';
  const defaultXXS = document.createElement('input'); defaultXXS.type = 'number';
  defaultXXS.className = 'defaultXXS';
  defaultXXS.size = 2;
  defaultXXS.value = 5;
  defaultXXS.min = minXXS.value;
  defaultXXS.max = maxXXS.value;

  minXXS.addEventListener('input', function () {
    defaultXXS.min = Number(minXXS.value);
    if (Number(defaultXXS.value) < Number(minXXS.value)) {
      defaultXXS.value = minXXS.value;
    }
  });

  maxXXS.addEventListener('input', function () {
    defaultXXS.max = Number(maxXXS.value);
    if (Number(defaultXXS.value) > Number(maxXXS.value)) {
      defaultXXS.value = maxXXS.value;
    }
  });

  // default_XTX
  const defaultXTX = document.createElement('input'); defaultXTX.type = 'checkbox';
  defaultXTX.className = 'defaultXTX';
  const labelDefaultXTX = document.createElement('label');
  labelDefaultXTX.htmlFor = 'defaultXTX';
  labelDefaultXTX.textContent = 'Toggled on by default';

  // Type
  const div_TYPE = document.createElement('div')
  div_TYPE.appendChild(labelForType);
  div_TYPE.appendChild(settingsType);
  div_TYPE.appendChild(document.createElement('br'));
  div_TYPE.appendChild(document.createElement('br'));
  divForMainSetingsInputs.appendChild(div_TYPE);

  // Text
  const div_TEXT = document.createElement('div')
  div_TEXT.appendChild(labelTextLTS);
  div_TEXT.appendChild(document.createElement('br'));
  div_TEXT.appendChild(textLTS);
  div_TEXT.appendChild(document.createElement('br'));
  divForMainSetingsInputs.appendChild(div_TEXT);

  // Name (namespace:name)
  const div_NAME = document.createElement('div')
  div_NAME.appendChild(document.createElement('br'));
  div_NAME.appendChild(labelNameXTS);
  div_NAME.appendChild(document.createElement('br'));
  div_NAME.appendChild(nameXTS);
  div_NAME.appendChild(document.createElement('br'));
  div_NAME.appendChild(document.createElement('br'));
  divForMainSetingsInputs.appendChild(div_NAME);

  // Minimum
  const div_MIN = document.createElement('div')
  div_MIN.appendChild(labelMinXXS);
  div_MIN.appendChild(minXXS);
  divForMainSetingsInputs.appendChild(div_MIN);

  // Maximum
  const div_MAX = document.createElement('div')
  div_MAX.appendChild(labelMaxXXS);
  div_MAX.appendChild(maxXXS);
  divForMainSetingsInputs.appendChild(div_MAX);

  // Step
  const div_STEP = document.createElement('div')
  div_STEP.appendChild(labelStepXXS);
  div_STEP.appendChild(stepXXS);
  divForMainSetingsInputs.appendChild(div_STEP);

  // Default (number)
  const div_DEFNUM = document.createElement('div')
  div_DEFNUM.appendChild(labelDefaultXXS);
  div_DEFNUM.appendChild(defaultXXS);
  divForMainSetingsInputs.appendChild(div_DEFNUM);

  // Default (boolean)
  const div_DEFBOOL = document.createElement('div')
  div_DEFBOOL.appendChild(defaultXTX);
  div_DEFBOOL.appendChild(labelDefaultXTX);
  divForMainSetingsInputs.appendChild(div_DEFBOOL);

  // When triggered, checks the type and only shows the needed input fields
  function showOnlyNeededSettings() {
    if (settingsType.value == "label") {
      div_TEXT.hidden = false;
      div_NAME.hidden = true;
      div_MIN.hidden = true;
      div_MAX.hidden = true;
      div_STEP.hidden = true;
      div_DEFNUM.hidden = true;
      div_DEFBOOL.hidden = true;
    } else if (settingsType.value == "toggle") {
      div_TEXT.hidden = false;
      div_NAME.hidden = false;
      div_MIN.hidden = true;
      div_MAX.hidden = true;
      div_STEP.hidden = true;
      div_DEFNUM.hidden = true;
      div_DEFBOOL.hidden = false;
    } else if (settingsType.value == "slider") {
      div_TEXT.hidden = false;
      div_NAME.hidden = false;
      div_MIN.hidden = false;
      div_MAX.hidden = false;
      div_STEP.hidden = false;
      div_DEFNUM.hidden = false;
      div_DEFBOOL.hidden = true;
    }
  }
  showOnlyNeededSettings() // trigger as initialization

  // Main input field
  settingsType.addEventListener('change', function () {
    showOnlyNeededSettings()
  })

  return divForMainSetingsInputs;
}

// SUBPACKS: Input Field UI
function createGenericInputFieldDiv(createInputFieldBox) {
  const div = document.createElement('div');
  div.className = "genericDiv";

  // Up/Down buttons section
  const divForUpAndDownBtns = document.createElement('div');
  divForUpAndDownBtns.className = 'divForUpAndDownBtns';

  const btnUp = document.createElement('button'); btnUp.type = 'button';
  btnUp.className = 'btnUp';
  /**/const svgUp = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  /**/svgUp.setAttribute('width', 24);
  /**/svgUp.setAttribute('height', 24);
  /**/svgUp.setAttribute('viewBox', '0 -960 960 960');
  /*    */const pathUp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  /*    */pathUp.setAttribute('d', 'M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z');
  /*    */pathUp.setAttribute('fill', 'currentColor');
  /**/svgUp.appendChild(pathUp);
  btnUp.appendChild(svgUp);

  const btnDown = document.createElement('button'); btnDown.type = 'button';
  btnDown.className = 'btnDown';
  /**/const svgDown = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  /**/svgDown.setAttribute('width', 24);
  /**/svgDown.setAttribute('height', 24);
  /**/svgDown.setAttribute('viewBox', '0 -960 960 960');
  /*    */const pathDown = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  /*    */pathDown.setAttribute('d', 'M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z');
  /*    */pathDown.setAttribute('fill', 'currentColor');
  /**/svgDown.appendChild(pathDown);
  btnDown.appendChild(svgDown);

  divForUpAndDownBtns.appendChild(btnUp);
  divForUpAndDownBtns.appendChild(btnDown);

  // Close button section
  const divForCloseBtn = document.createElement('div');
  divForCloseBtn.className = 'divForCloseBtn';
  divForCloseBtn.style.width = '1.5em';
  divForCloseBtn.style.height = '1.5em';
  divForCloseBtn.style.marginLeft = 'auto';

  const btnClose = document.createElement('button'); btnClose.type = 'button';
  btnClose.className = 'btnClose';
  /**/const svgClose = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  /**/svgClose.setAttribute('width', 24);
  /**/svgClose.setAttribute('height', 24);
  /**/svgClose.setAttribute('viewBox', '0 -960 960 960');
  /*    */const pathClose = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  /*    */pathClose.setAttribute('d', 'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z');
  /*    */pathClose.setAttribute('fill', 'currentColor');
  /**/svgClose.appendChild(pathClose);
  btnClose.appendChild(svgClose);

  divForCloseBtn.appendChild(btnClose);

  // Assemble the full div
  const mainInputField = createInputFieldBox();;

  div.appendChild(divForUpAndDownBtns);
  if (mainInputField) { div.appendChild(mainInputField) } // to prevent an error if the mainInputField doesn't exist
  div.appendChild(divForCloseBtn);


  // FUNCTIONS -----------------------------------------------------

  // Up button
  btnUp.addEventListener('click', function () {
    const parent = div.parentNode;
    const prev = div.previousElementSibling;
    if (!prev) return;
    parent.insertBefore(div, prev);
    refreshAll();
  })

  // Down button
  btnDown.addEventListener('click', function () {
    const parent = div.parentNode;
    const next = div.nextElementSibling;
    if (!next) return;
    parent.insertBefore(next, div);
    refreshAll();
  })

  // Close button:
  btnClose.addEventListener('click', function () {
    if (confirm('Are you sure you want to delete this? You cannot undo this process.')) {
      div.remove(); // Remove subpack
      refreshAll();
    }
  });

  return div;
}

// Subpack Data Collector
function collectAllSubpackData() {
  valueSubpack = Array.from(subpacksDiv.querySelectorAll('.genericDiv')).map(div => ({
    name: div.querySelector('.subpackDescription').value,
    folder_name: div.querySelector('.subpackFolderName').value,
    memory_performance_tier: div.querySelector('.subpackMemoryTier').value
  }));
}

// Settings Data Collector
function collectAllSettingsData() {
  valueSettings = Array.from(settingsDiv.querySelectorAll('.genericDiv')).map(div => ({
    type: div.querySelector('.settingsType').value,
    text: div.querySelector('.textLTS').value,
    name: div.querySelector('.nameXTS').value,
    min: div.querySelector('.minXXS').value,
    max: div.querySelector('.maxXXS').value,
    step: div.querySelector('.stepXXS').value,
    DEFNUM: div.querySelector('.defaultXXS').value,
    DEFBOOL: div.querySelector('.defaultXTX').checked
  }));
}


function updateButtonVisibility() {
  if (valueSubpack.length > 0) { btnAddSubpack2.hidden = false }
  else { btnAddSubpack2.hidden = true }
  if (valueSettings.length > 0) { btnAddSettings2.hidden = false }
  else { btnAddSettings2.hidden = true }
}

// Subpack Adder Button
const subpacksDiv = document.getElementById('subpacksDiv'); // Place

const btnAddSubpack = document.getElementById('btnAddSubpack');
btnAddSubpack.addEventListener('click', function () {
  const newSubpack = createGenericInputFieldDiv(createSubpackInputField);
  subpacksDiv.appendChild(newSubpack);
});

const btnAddSubpack2 = document.getElementById('btnAddSubpack2');
btnAddSubpack2.addEventListener('click', function () {
  const newSubpack = createGenericInputFieldDiv(createSubpackInputField);
  subpacksDiv.prepend(newSubpack);
});


// SETTINGS: WEB: input field
const settingsDiv = document.getElementById("settingsDiv");

// Settings Adder Button
const btnAddSettings = document.getElementById("btnAddSettings");
btnAddSettings.addEventListener('click', function () {
  const newSettings = createGenericInputFieldDiv(createSettingsInputField);
  settingsDiv.appendChild(newSettings);
})

const btnAddSettings2 = document.getElementById("btnAddSettings2");
btnAddSettings2.addEventListener('click', function () {
  const newSettings = createGenericInputFieldDiv(createSettingsInputField);
  settingsDiv.prepend(newSettings);
})


// COPYABLE TEXT FILE
let copyableTextArea = document.getElementById("copyableTextArea");
let fileText = "";

function generateTextFile() {
  const capabilities = [];
  if (fieldPBR.checked) { capabilities.push("pbr") };
  if (fieldExpCustUI.checked) { capabilities.push("experimental_custom_ui") };
  if (fieldRaytraced.checked) { capabilities.push("raytraced") };
  if (fieldChem.checked) { capabilities.push("chemistry") };
  if (fieldEditorExt.checked) { capabilities.push("editorExtension") };

  let authorsFixed = "";
  authorsFixed = valueAuthors.split("\n").filter(a => a.trim() !== "");
  const url = valueWebURL;

  const metadata = {
    ...(authorsFixed.length > 0 && { authors: authorsFixed }),
    ...(url.length > 0 && { url: url })
  }

  let settingsDataFiltered = valueSettings;
  for (i = 0; i < valueSettings.length; i++) {
    if (settingsDataFiltered[i]['type'] == "slider") {
      delete settingsDataFiltered[i]['DEFBOOL']
      // rename defnum to default
      settingsDataFiltered[i]['default'] = settingsDataFiltered[i]['DEFNUM']
      delete settingsDataFiltered[i]['DEFNUM']
    } else if (settingsDataFiltered[i]['type'] == "toggle") {
      delete settingsDataFiltered[i]['step']
      delete settingsDataFiltered[i]['min']
      delete settingsDataFiltered[i]['max']
      delete settingsDataFiltered[i]['DEFNUM']
      // rename defbool to default
      settingsDataFiltered[i]['default'] = settingsDataFiltered[i]['DEFBOOL']
      delete settingsDataFiltered[i]['DEFBOOL']
    } else {
      delete settingsDataFiltered[i]['step']
      delete settingsDataFiltered[i]['name']
      delete settingsDataFiltered[i]['min']
      delete settingsDataFiltered[i]['max']
      delete settingsDataFiltered[i]['DEFNUM']
      delete settingsDataFiltered[i]['DEFBOOL']
    }
  }

  // generate the json file and put it in fileText
  fileText = JSON.stringify(
    {
      format_version: 3,
      header: {
        name: valuePackname,
        description: valuePackdesc,
        uuid: crypto.randomUUID(),
        version: `${valueVerA}.${valueVerB}.${valueVerC}`,
        min_engine_version: `${valueMEVA}.${valueMEVB}.${valueMEVC}`
      },
      modules: [
        {
          description: valuePackdesc,
          type: "resources",
          uuid: crypto.randomUUID(),
          version: `${valueVerA}.${valueVerB}.${valueVerC}`
        }
      ],
      ...(Object.keys(metadata).length > 0 && { metadata }),
      ...(capabilities.length > 0 && { capabilities: capabilities }),
      ...(valueSubpack.length > 0 && { subpacks: valueSubpack }),
      ...(settingsDataFiltered.length > 0 && { settings: settingsDataFiltered })
    },
    "", // idk
    "  " // indentation
  )
}

const copyToClipboardBtn = document.getElementById("copyToClipboardBtn");
copyToClipboardBtn.addEventListener('click', function () {
  navigator.clipboard.writeText(fileText);
  copyableTextArea.select();
})

const downloadFileBtn = document.getElementById('downloadFileBtn');
downloadFileBtn.addEventListener('click', function () {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(fileText));
  element.setAttribute('download', "manifest.json");
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
})


// WEB UI
// const previewMode = document.getElementById("previewMode");

// const packPreviewFileText = document.getElementById("packPreviewFileText");
// const packPreviewIngame = document.getElementById("packPreviewIngame");

// function renderPreviewMode() {
//   if (previewMode.value == "textFile") {
//     packPreviewFileText.hidden = false;
//     packPreviewIngame.hidden = true;
//   } else {
//     packPreviewFileText.hidden = true;
//     packPreviewIngame.hidden = false;
//   }
// }

// let ingamePackname = document.getElementById("ingamePackname");
// let ingamePackdesc = document.getElementById("ingamePackdesc");

// renderPreviewMode();
// previewMode.addEventListener('change', renderPreviewMode);

// prevent user from accidentally exiting and uhh, crying
// this may not be necessary lol, idk
window.onbeforeunload = function () {
  return "Data will be lost if you leave or refresh the page, are you sure you want to continue?";
};

// -------------------------------------------------------------------------------------

const verWarn = document.getElementById('verWarn');
const MEVWarn = document.getElementById('MEVWarn');

function addWarnToVersions(a, b, c) {
  if (a.value == 0 && b.value == 0 && c.value == 0) {
    a.classList.add("warn");
    b.classList.add("warn");
    c.classList.add("warn");
  } else {
    a.classList.remove("warn");
    b.classList.remove("warn");
    c.classList.remove("warn");
  }
}

function refreshAll() {
  changeValuesToFields()
  collectAllSubpackData();
  collectAllSettingsData();
  generateTextFile();
  updateButtonVisibility();

  addWarnToVersions(fieldVerA, fieldVerB, fieldVerC)
  addWarnToVersions(fieldMEVA, fieldMEVB, fieldMEVC)

  copyableTextArea.value = fileText;
  // ingamePackname.innerHTML = valuePackname;
  // ingamePackdesc.innerHTML = valuePackdesc;
}
refreshAll()

document.addEventListener('input', refreshAll);
document.querySelectorAll('button, input[type="button"]').forEach(btn => {
  btn.addEventListener('click', refreshAll);
});