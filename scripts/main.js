// HEADER/MODULES
const defaultValuePackname = "";
const defaultValuePackdesc = "";
const defaultValueVerA = 0;
const defaultValueVerB = 0;
const defaultValueVerC = 1;
const defaultValueMEVA = 1;
const defaultValueMEVB = 26;
const defaultValueMEVC = 10;
const defaultValueHeaderUUID = crypto.randomUUID();
const defaultValueModuleUUID = crypto.randomUUID();
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
let valueHeaderUUID;
let valueModuleUUID;
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
  valueHeaderUUID = defaultValueHeaderUUID
  valueModuleUUID = defaultValueModuleUUID
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
const fieldHeaderUUID = document.getElementById("headerUUID");
const fieldModuleUUID = document.getElementById("moduleUUID");

function addWarnToVersions(a, b, c) {
  if (
    (a.value == 0 && b.value == 0 && c.value == 0)
    ||
    (a.value < 0 || b.value < 0 || c.value < 0)
  ) {
    a.classList.add("warn");
    b.classList.add("warn");
    c.classList.add("warn");
  } else {
    a.classList.remove("warn");
    b.classList.remove("warn");
    c.classList.remove("warn");
  }
}
// addWarnToVersions(fieldVerA, fieldVerB, fieldVerC)
// addWarnToVersions(fieldMEVA, fieldMEVB, fieldMEVC)
fieldVerA.addEventListener('input', function () { addWarnToVersions(fieldVerA, fieldVerB, fieldVerC) })
fieldVerB.addEventListener('input', function () { addWarnToVersions(fieldVerA, fieldVerB, fieldVerC) })
fieldVerC.addEventListener('input', function () { addWarnToVersions(fieldVerA, fieldVerB, fieldVerC) })
fieldMEVA.addEventListener('input', function () { addWarnToVersions(fieldMEVA, fieldMEVB, fieldMEVC) })
fieldMEVB.addEventListener('input', function () { addWarnToVersions(fieldMEVA, fieldMEVB, fieldMEVC) })
fieldMEVC.addEventListener('input', function () { addWarnToVersions(fieldMEVA, fieldMEVB, fieldMEVC) })

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
  fieldHeaderUUID.value = valueHeaderUUID;
  fieldModuleUUID.value = valueModuleUUID;
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

  valueHeaderUUID = fieldHeaderUUID.value;
  valueModuleUUID = fieldModuleUUID.value;

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

  valueHeaderUUID = manifestJsonFile.header.uuid;
  valueModuleUUID = manifestJsonFile.modules[0].uuid;

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
      const text = newSettings.querySelector('.settingsInputText');
      const name = newSettings.querySelector('.settingsInputName');
      const min = newSettings.querySelector('.settingsInputMin');
      const max = newSettings.querySelector('.settingsInputMax');
      const step = newSettings.querySelector('.settingsInputStep');
      const defNum = newSettings.querySelector('.settingsInputDefnum');
      const defBool = newSettings.querySelector('.settingsInputDefbool');

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

  // Description
  const labelDesc = document.createElement('label');
  labelDesc.htmlFor = 'subpackDescription';
  labelDesc.textContent = 'Subpack Title/Description: ';

  const textareaDesc = document.createElement('textarea');
  textareaDesc.classList.add('subpackDescription');
  textareaDesc.rows = 3;
  textareaDesc.style.width = '100%';

  // Folder name
  const labelFolder = document.createElement('label');
  labelFolder.htmlFor = 'subpackFolderName';
  labelFolder.textContent = 'Subpack Folder Name: ';

  const inputFolder = document.createElement('input'); inputFolder.type = 'text';
  inputFolder.classList.add('subpackFolderName');
  inputFolder.style.width = '100%';
  inputFolder.placeholder = 'folder_name';

  // Memory tier
  const labelTier = document.createElement('label');
  labelTier.htmlFor = 'subpackMemoryTier';
  labelTier.textContent = 'Memory Performance Tier: ';

  const inputTier = document.createElement('input'); inputTier.type = 'number';
  inputTier.classList.add('subpackMemoryTier');
  inputTier.classList.add('supportsWarn');
  inputTier.size = 3;
  inputTier.min = 0;
  inputTier.value = 0;

  // List
  const list = document.createElement('ul');
  list.classList.add('subpackInputsList');

  // Description
  const listDesc = document.createElement('li');
  listDesc.appendChild(labelDesc);
  listDesc.appendChild(document.createElement('br'));
  listDesc.appendChild(textareaDesc);
  list.appendChild(listDesc);

  // Folder name
  const listFolder = document.createElement('li');
  listFolder.appendChild(labelFolder);
  listFolder.appendChild(document.createElement('br'));
  listFolder.appendChild(inputFolder);
  list.appendChild(listFolder);

  // Memory tier
  const listTier = document.createElement('li');
  listTier.appendChild(labelTier);
  listTier.appendChild(inputTier);
  list.appendChild(listTier);

  divForMainSubpackInputs.appendChild(list);

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
  settingsType.classList.add('settingsType');
  settingsType.classList.add('blueButton');

  const optionLabel = document.createElement('option')
  optionLabel.value = 'label';
  optionLabel.innerHTML = 'Label';
  const optionToggle = document.createElement('option')
  optionToggle.value = 'toggle';
  optionToggle.innerHTML = 'Toggle';
  const optionSlider = document.createElement('option')
  optionSlider.value = 'slider';
  optionSlider.innerHTML = 'Slider';
  const optionDropdown = document.createElement('option')
  optionDropdown.value = 'dropdown';
  optionDropdown.innerHTML = 'Dropdown';

  settingsType.appendChild(optionLabel);
  settingsType.appendChild(optionToggle);
  settingsType.appendChild(optionSlider);
  // settingsType.appendChild(optionDropdown); // not available yet :3

  // text_LTS
  const labelsettingsInputText = document.createElement('label');
  labelsettingsInputText.htmlFor = 'settingsInputText';
  labelsettingsInputText.textContent = 'Text: ';
  const settingsInputText = document.createElement('textarea');
  settingsInputText.classList.add('settingsInputText');
  settingsInputText.style.resize = 'vertical';
  settingsInputText.style.width = '100%';
  settingsInputText.rows = '3';

  // name_XTS
  const labelsettingsInputName = document.createElement('label');
  labelsettingsInputName.htmlFor = 'settingsInputName';
  labelsettingsInputName.textContent = 'Name: ';
  const settingsInputName = document.createElement('input'); settingsInputName.type = 'text';
  settingsInputName.classList.add('settingsInputName');
  settingsInputName.placeholder = 'space:name';
  settingsInputName.style.width = '100%';

  // min_XXS
  const settingsInputMin = document.createElement('input'); settingsInputMin.type = 'number';
  settingsInputMin.classList.add('settingsInputMin');
  settingsInputMin.classList.add('supportsWarn');
  settingsInputMin.size = 2;
  settingsInputMin.value = 0;
  settingsInputMin.title = 'Min value';

  const sliderslider = document.createElement('input'); sliderslider.type = 'range';
  sliderslider.style.flexGrow = 1;
  sliderslider.style.width = 0; // for some reason this fixes the issue of the slider not adjusting its width, if it works it works

  // max_XXS
  const settingsInputMax = document.createElement('input'); settingsInputMax.type = 'number';
  settingsInputMax.classList.add('settingsInputMax');
  settingsInputMax.classList.add('supportsWarn');
  settingsInputMax.size = 2;
  settingsInputMax.value = 10;
  settingsInputMax.title = 'Max value';

  // step_XXS
  const labelsettingsInputStep = document.createElement('label');
  labelsettingsInputStep.htmlFor = 'settingsInputStep';
  labelsettingsInputStep.textContent = 'Step:';
  const settingsInputStep = document.createElement('input'); settingsInputStep.type = 'number';
  settingsInputStep.classList.add('settingsInputStep');
  settingsInputStep.classList.add('supportsWarn');
  settingsInputStep.size = 2;
  settingsInputStep.value = 1;
  settingsInputStep.min = 0;

  // default_XXS
  const labelsettingsInputDefnum = document.createElement('label');
  labelsettingsInputDefnum.htmlFor = 'settingsInputDefnum';
  labelsettingsInputDefnum.textContent = 'Default: ';
  const settingsInputDefnum = document.createElement('input'); settingsInputDefnum.type = 'number';
  settingsInputDefnum.classList.add('settingsInputDefnum');
  settingsInputDefnum.classList.add('supportsWarn');
  settingsInputDefnum.size = 2;
  settingsInputDefnum.value = 5;
  settingsInputDefnum.min = settingsInputMin.value;
  settingsInputDefnum.max = settingsInputMax.value;

  function updateRangeInput() {
    if (!settingsInputMin.validity.valid || !settingsInputMax.validity.valid) {
      settingsInputMin.classList.add('warn');
      settingsInputMax.classList.add('warn');
    } else {
      settingsInputMin.classList.remove('warn');
      settingsInputMax.classList.remove('warn');
      settingsInputMin.max = settingsInputMax.value;
      settingsInputMax.min = settingsInputMin.value;
      sliderslider.min = settingsInputMin.value;
      sliderslider.max = settingsInputMax.value;
      settingsInputDefnum.min = settingsInputMin.value;
      settingsInputDefnum.max = settingsInputMax.value;
      if (Number(settingsInputDefnum.value) < Number(settingsInputMin.value)) {
        settingsInputDefnum.value = settingsInputMin.value;
      }
      if (Number(settingsInputDefnum.value) > Number(settingsInputMax.value)) {
        settingsInputDefnum.value = settingsInputMax.value;
      }
      sliderslider.value = settingsInputDefnum.value
    }
  }

  updateRangeInput()
  settingsInputMin.addEventListener('input', updateRangeInput);
  settingsInputMax.addEventListener('input', updateRangeInput);

  // default_XTX
  const settingsInputDefbool = document.createElement('input'); settingsInputDefbool.type = 'checkbox';
  settingsInputDefbool.className = 'settingsInputDefbool';
  const labelsettingsInputDefbool = document.createElement('label');
  labelsettingsInputDefbool.htmlFor = 'settingsInputDefbool';
  labelsettingsInputDefbool.textContent = 'Toggled on by default';

  // Appending the input fields ------------------------------------------------------

  // list
  const list = document.createElement('ul')
  list.classList.add('settingsInputsList')

  // Type
  const listType = document.createElement('li')
  listType.appendChild(labelForType);
  listType.appendChild(settingsType);
  list.appendChild(listType);

  // Text
  const listText = document.createElement('li')
  listText.appendChild(labelsettingsInputText);
  listText.appendChild(document.createElement('br'));
  listText.appendChild(settingsInputText);
  list.appendChild(listText);

  // Name (namespace:name)
  const listName = document.createElement('li')
  listName.appendChild(labelsettingsInputName);
  listName.appendChild(settingsInputName);
  list.appendChild(listName);

  // Range
  const rangeDiv = document.createElement('div')
  rangeDiv.style.display = 'flex';
  rangeDiv.style.width = '100%'
  rangeDiv.append(settingsInputMin, sliderslider, settingsInputMax);
  const listRange = document.createElement('li')
  listRange.append(rangeDiv);
  list.appendChild(listRange);

  // Step
  const listStep = document.createElement('li')
  listStep.appendChild(labelsettingsInputStep);
  listStep.appendChild(settingsInputStep);
  list.appendChild(listStep);

  // Default (number)
  const listDefnum = document.createElement('li')
  listDefnum.appendChild(labelsettingsInputDefnum);
  listDefnum.appendChild(settingsInputDefnum);
  list.appendChild(listDefnum);

  // Default (boolean)
  const listDefbool = document.createElement('li')
  listDefbool.appendChild(settingsInputDefbool);
  listDefbool.appendChild(labelsettingsInputDefbool);
  list.appendChild(listDefbool);

  divForMainSetingsInputs.appendChild(list)

  // When triggered, checks the type and only shows the needed input fields
  function showOnlyNeededSettings() {
    if (settingsType.value == "label") {
      listType.hidden = false;
      listName.hidden = true;
      listRange.hidden = true;
      listStep.hidden = true;
      listDefnum.hidden = true;
      listDefbool.hidden = true;
    } else if (settingsType.value == "toggle") {
      listType.hidden = false;
      listName.hidden = false;
      listRange.hidden = true;
      listStep.hidden = true;
      listDefnum.hidden = true;
      listDefbool.hidden = false;
    } else if (settingsType.value == "slider") {
      listType.hidden = false;
      listName.hidden = false;
      listRange.hidden = false;
      listStep.hidden = false;
      listDefnum.hidden = false;
      listDefbool.hidden = true;
    }
    // listType.hidden = false;
    // listName.hidden = false;
    // listRange.hidden = false;
    // listStep.hidden = false;
    // listDefnum.hidden = false;
    // listDefbool.hidden = false;
  }
  showOnlyNeededSettings() // trigger as initialization

  // Main input field
  settingsType.addEventListener('change', function () {
    showOnlyNeededSettings()
  })

  return divForMainSetingsInputs;
}

// Input Field UI
function createGenericInputFieldDiv(createInputFieldBox) {
  const div = document.createElement('div');
  div.classList.add('mainInputFieldDiv');

  // Up/Down buttons section
  const divForUpAndDownBtns = document.createElement('div');
  divForUpAndDownBtns.classList.add('divForUpAndDownBtns');

  const btnUp = document.createElement('button'); btnUp.type = 'button';
  btnUp.classList.add('btnUp');
  btnUp.innerHTML = '<span class="material-symbols-outlined">keyboard_arrow_up</span>'

  const btnDown = document.createElement('button'); btnDown.type = 'button';
  btnDown.classList.add('btnDown');
  btnDown.innerHTML = '<span class="material-symbols-outlined">keyboard_arrow_down</span>'

  divForUpAndDownBtns.appendChild(btnUp);
  divForUpAndDownBtns.appendChild(btnDown);

  // Close button section
  const divForCloseBtn = document.createElement('div');
  divForCloseBtn.classList.add('divForCloseBtn');
  divForCloseBtn.style.width = '1.5em';
  divForCloseBtn.style.height = '1.5em';
  divForCloseBtn.style.marginLeft = 'auto';

  const btnClose = document.createElement('button'); btnClose.type = 'button';
  btnClose.classList.add('btnClose');
  btnClose.innerHTML = '<span class="material-symbols-outlined">close</span>';

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
  valueSubpack = Array.from(subpacksDiv.querySelectorAll('.mainInputFieldDiv')).map(div => ({
    name: div.querySelector('.subpackDescription').value,
    folder_name: div.querySelector('.subpackFolderName').value,
    memory_performance_tier: div.querySelector('.subpackMemoryTier').value
  }));
}

// Settings Data Collector
function collectAllSettingsData() {
  valueSettings = Array.from(settingsDiv.querySelectorAll('.mainInputFieldDiv')).map(div => ({
    type: div.querySelector('.settingsType').value,
    text: div.querySelector('.settingsInputText').value,
    name: div.querySelector('.settingsInputName').value,
    min: div.querySelector('.settingsInputMin').value,
    max: div.querySelector('.settingsInputMax').value,
    step: div.querySelector('.settingsInputStep').value,
    DEFNUM: div.querySelector('.settingsInputDefnum').value,
    DEFBOOL: div.querySelector('.settingsInputDefbool').checked
  }));
}


function updateButtonVisibility() {
  if (valueSubpack.length > 0) { btnAddSubpack2.hidden = false }
  else { btnAddSubpack2.hidden = true }
  if (valueSettings.length > 0) { btnAddSettings2.hidden = false }
  else { btnAddSettings2.hidden = true }
}

const regenHeaderUUID = document.getElementById('regenHeaderUUID');
regenHeaderUUID.addEventListener('click', function () {
  fieldHeaderUUID.value = crypto.randomUUID();
})
const regenModuleUUID = document.getElementById('regenModuleUUID');
regenModuleUUID.addEventListener('click', function () {
  fieldModuleUUID.value = crypto.randomUUID();
})

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
        uuid: valueHeaderUUID,
        version: `${valueVerA}.${valueVerB}.${valueVerC}`,
        min_engine_version: `${valueMEVA}.${valueMEVB}.${valueMEVC}`
      },
      modules: [
        {
          description: valuePackdesc,
          type: "resources",
          uuid: valueModuleUUID,
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





function refreshAll() {
  changeValuesToFields()
  collectAllSubpackData();
  collectAllSettingsData();
  generateTextFile();
  updateButtonVisibility();



  copyableTextArea.value = fileText;
  // ingamePackname.innerHTML = valuePackname;
  // ingamePackdesc.innerHTML = valuePackdesc;
}
refreshAll()

document.addEventListener('input', refreshAll);
document.querySelectorAll('button, input[type="button"]').forEach(btn => {
  btn.addEventListener('click', refreshAll);
});