// ========== GLOBAL STATE ==========
var STORAGE_KEY = 'animalec_prototype_data';
var appData = null;

function loadData() {
  var stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    sponsors: [
      {
        id: 1,
        name: "EcoVida Wildlife Fund",
        animal: "Tigre",
        website: "https://ecovida.example.com",
        description: "Organização dedicada à preservação de grandes felinos em habitats naturais."
      },
      {
        id: 2,
        name: "Ocean Guardians",
        animal: "Lontra",
        website: "https://oceanguardians.example.org",
        description: "Proteção de mamíferos aquáticos e ecossistemas marinhos."
      },
      {
        id: 3,
        name: "Savana Conservation",
        animal: "Elefante",
        website: "https://savana.example.net",
        description: "Conservação de elefantes africanos e asiáticos."
      }
    ],
    experts: [
      {
        id: 1,
        name: "Dr. João Silva",
        specialty: "Mamíferos (Felidae)",
        email: "joao.silva@universidade.pt",
        institution: "Universidade de Lisboa",
        bio: "Especialista em comportamento e conservação de grandes felinos com 15 anos de experiência."
      },
      {
        id: 2,
        name: "Dra. Maria Costa",
        specialty: "Aves (Passeriformes)",
        email: "maria.costa@instituto.pt",
        institution: "Instituto de Ornitologia",
        bio: "Investigadora dedicada ao estudo de aves migratórias e seus padrões comportamentais."
      },
      {
        id: 3,
        name: "Prof. Carlos Mendes",
        specialty: "Répteis",
        email: "carlos.mendes@ciencias.pt",
        institution: "Faculdade de Ciências",
        bio: "Professor e pesquisador com foco em herpetologia tropical."
      }
    ]
  };
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

function initData() {
  appData = loadData();
}

// ========== DATA FUNCTIONS ==========
function getSponsors() {
  return appData.sponsors;
}

function getSponsor(id) {
  return appData.sponsors.find(function(s) { return s.id === parseInt(id); });
}

function addSponsor(sponsor) {
  var newId = appData.sponsors.length > 0 
    ? Math.max.apply(null, appData.sponsors.map(function(s) { return s.id; })) + 1 
    : 1;
  sponsor.id = newId;
  appData.sponsors.push(sponsor);
  saveData();
  return sponsor;
}

function updateSponsor(id, sponsor) {
  var index = -1;
  for (var i = 0; i < appData.sponsors.length; i++) {
    if (appData.sponsors[i].id === parseInt(id)) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    appData.sponsors[index] = sponsor;
    appData.sponsors[index].id = parseInt(id);
    saveData();
    return appData.sponsors[index];
  }
  return null;
}

function deleteSponsorById(id) {
  var index = -1;
  for (var i = 0; i < appData.sponsors.length; i++) {
    if (appData.sponsors[i].id === parseInt(id)) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    appData.sponsors.splice(index, 1);
    saveData();
    return true;
  }
  return false;
}

function getExperts() {
  return appData.experts;
}

function getExpert(id) {
  return appData.experts.find(function(e) { return e.id === parseInt(id); });
}

function addExpert(expert) {
  var newId = appData.experts.length > 0 
    ? Math.max.apply(null, appData.experts.map(function(e) { return e.id; })) + 1 
    : 1;
  expert.id = newId;
  appData.experts.push(expert);
  saveData();
  return expert;
}

function updateExpert(id, expert) {
  var index = -1;
  for (var i = 0; i < appData.experts.length; i++) {
    if (appData.experts[i].id === parseInt(id)) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    appData.experts[index] = expert;
    appData.experts[index].id = parseInt(id);
    saveData();
    return appData.experts[index];
  }
  return null;
}

function deleteExpertById(id) {
  var index = -1;
  for (var i = 0; i < appData.experts.length; i++) {
    if (appData.experts[i].id === parseInt(id)) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    appData.experts.splice(index, 1);
    saveData();
    return true;
  }
  return false;
}

// ========== ROUTER ==========
function navigate(path) {
  window.location.hash = path;
}

function handleRoute() {
  var hash = window.location.hash.slice(1) || 'home';
  var parts = hash.split('/');
  var path = parts[0];
  var params = parts.slice(1);
  
  if (path === 'home') {
    renderHome();
  } else if (path === 'sponsors') {
    if (params[0] === 'view' && params[1]) {
      renderSponsorView(params[1]);
    } else if (params[0] === 'create') {
      renderSponsorForm(null);
    } else if (params[0] === 'edit' && params[1]) {
      renderSponsorForm(params[1]);
    } else {
      renderSponsorsList();
    }
  } else if (path === 'experts') {
    if (params[0] === 'view' && params[1]) {
      renderExpertView(params[1]);
    } else if (params[0] === 'create') {
      renderExpertForm(null);
    } else if (params[0] === 'edit' && params[1]) {
      renderExpertForm(params[1]);
    } else {
      renderExpertsList();
    }
  } else {
    renderHome();
  }
}

// ========== VIEWS ==========
function renderHome() {
  var content = document.getElementById('app-content');
  content.innerHTML = '<header class="masthead bg-secondary text-white text-center">' +
    '<div class="container">' +
    '<img class="masthead-avatar mb-2" src="../assets/animalec.png" alt="logo" />' +
    '<p class="masthead-subheading font-weight-light">Aprender tudo sobre animais de uma forma divertida!</p>' +
    '<div class="mt-3">' +
    '<button class="btn btn-light p-2 mr-2"><i class="fas fa-info-circle mr-2"></i>COMO JOGAR?</button>' +
    '<button class="btn btn-danger p-2"><i class="fas fa-chart-line mr-2"></i>VER RANKING</button>' +
    '</div></div></header>' +
    '<section class="page-section"><div class="container text-center">' +
    '<h2 class="page-section-heading mt-2 text-uppercase text-secondary">Explorar</h2>' +
    '<div class="divider-custom"><div class="divider-custom-line"></div><div class="divider-custom-icon"><i class="fas fa-star"></i></div><div class="divider-custom-line"></div></div>' +
    '<div class="row">' +
    '<div class="col-md-3 mb-3"><div class="img-thumbnail" style="height:120px; background:#ddd; display:flex; align-items:center; justify-content:center;"><i class="fas fa-paw fa-3x text-muted"></i></div><p class="mt-2">Animais</p></div>' +
    '<div class="col-md-3 mb-3"><div class="img-thumbnail" style="height:120px; background:#ddd; display:flex; align-items:center; justify-content:center;"><i class="fas fa-question-circle fa-3x text-muted"></i></div><p class="mt-2">Quizzes</p></div>' +
    '<div class="col-md-3 mb-3"><div class="img-thumbnail" style="height:120px; background:#ddd; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="navigate(\'sponsors\')"><i class="fas fa-hand-holding-usd fa-3x text-muted"></i></div><p class="mt-2"><a href="#sponsors" class="text-decoration-none">Patrocinadores</a></p></div>' +
    '<div class="col-md-3 mb-3"><div class="img-thumbnail" style="height:120px; background:#ddd; display:flex; align-items:center; justify-content:center; cursor:pointer;" onclick="navigate(\'experts\')"><i class="fas fa-user-graduate fa-3x text-muted"></i></div><p class="mt-2"><a href="#experts" class="text-decoration-none">Especialistas</a></p></div>' +
    '</div></div></section>';
}

function renderSponsorsList() {
  var sponsors = getSponsors();
  var rows = '';
  for (var i = 0; i < sponsors.length; i++) {
    var s = sponsors[i];
    rows += '<tr><td class="pt-4">' + s.name + '</td><td class="pt-4">' + s.animal + '</td><td class="pt-4">' + s.website + '</td><td>' +
      '<button class="btn btn-outline-success mr-2 mt-2" onclick="navigate(\'sponsors/edit/' + s.id + '\')"><i class="fas fa-edit"></i> EDITAR</button>' +
      '<button class="btn btn-outline-success mr-2 mt-2" onclick="navigate(\'sponsors/view/' + s.id + '\')"><i class="fas fa-search"></i> VER</button>' +
      '<button class="btn btn-outline-danger mr-2 mt-2" onclick="deleteSponsor(' + s.id + ')"><i class="fas fa-trash-alt"></i> REMOVER</button>' +
      '</td></tr>';
  }
  
  document.getElementById('app-content').innerHTML =
    '<section class="page-section"><div class="container"><div class="text-center">' +
    '<h2 class="page-section-heading mt-5">GESTÃO DE PATROCINADORES</h2>' +
    '<div class="divider-custom"><div class="divider-custom-line"></div><div class="divider-custom-icon"><i class="fas fa-star"></i></div><div class="divider-custom-line"></div></div></div>' +
    '<div class="mb-4 text-center">' +
    '<button class="btn btn-outline-success mr-2 mt-2" onclick="navigate(\'sponsors/create\')"><i class="fas fa-plus-square"></i> ADICIONAR PATROCINADOR</button>' +
    '<button class="btn btn-outline-info mr-2 mt-2" onclick="navigate(\'home\')"><i class="fas fa-bars"></i> MENU PRINCIPAL</button></div>' +
    '<div class="row"><div class="col-12 col-md-10 offset-md-1"><table class="table table-striped"><thead class="thead-dark"><tr><th>NOME</th><th>ANIMAL</th><th>WEBSITE</th><th>AÇÕES</th></tr></thead><tbody>' +
    rows + '</tbody></table></div></div></div></section>';
}

function renderSponsorView(id) {
  var sponsor = getSponsor(id);
  if (!sponsor) {
    navigate('sponsors');
    return;
  }
  
  document.getElementById('app-content').innerHTML =
    '<section class="page-section"><div class="container"><div class="text-center">' +
    '<h2 class="page-section-heading mt-5">DETALHES DO PATROCINADOR</h2>' +
    '<div class="divider-custom"><div class="divider-custom-line"></div><div class="divider-custom-icon"><i class="fas fa-star"></i></div><div class="divider-custom-line"></div></div></div>' +
    '<div class="row"><div class="col-12 col-md-8 offset-md-2"><div class="card mb-3">' +
    '<div class="card-body"><h5 class="card-title">' + sponsor.name + '</h5>' +
    '<p class="card-text mb-1"><strong>Animal Associado:</strong> ' + sponsor.animal + '</p>' +
    '<p class="card-text mb-1"><strong>Website:</strong> <a href="' + sponsor.website + '" target="_blank">' + sponsor.website + '</a></p>' +
    '<p class="card-text"><strong>Descrição:</strong> ' + sponsor.description + '</p>' +
    '<button class="btn btn-outline-success mr-2 mt-2" onclick="navigate(\'sponsors/edit/' + sponsor.id + '\')"><i class="fas fa-edit"></i> EDITAR</button>' +
    '<button class="btn btn-outline-info mr-2 mt-2" onclick="navigate(\'sponsors\')"><i class="fas fa-arrow-left"></i> VOLTAR</button>' +
    '</div></div></div></div></div></section>';
}

function renderSponsorForm(id) {
  var isEdit = id !== null;
  var sponsor = isEdit ? getSponsor(id) : { name: '', animal: '', website: '', description: '' };
  
  if (isEdit && !sponsor) {
    navigate('sponsors');
    return;
  }
  
  document.getElementById('app-content').innerHTML =
    '<section class="page-section"><div class="container"><div class="text-center">' +
    '<h2 class="page-section-heading mt-5">' + (isEdit ? 'EDITAR' : 'CRIAR') + ' PATROCINADOR</h2>' +
    '<div class="divider-custom"><div class="divider-custom-line"></div><div class="divider-custom-icon"><i class="fas fa-star"></i></div><div class="divider-custom-line"></div></div></div>' +
    '<div class="row"><div class="col-12 col-md-8 offset-md-2"><form id="sponsorForm">' +
    '<div class="form-group"><input type="text" class="form-control form-control-lg" placeholder="nome do patrocinador" id="sponsor_name" value="' + sponsor.name + '" required /></div>' +
    '<div class="form-row"><div class="form-group col-md-6"><input type="text" class="form-control form-control-lg" placeholder="animal associado" id="sponsor_animal" value="' + sponsor.animal + '" required /></div>' +
    '<div class="form-group col-md-6"><input type="url" class="form-control form-control-lg" placeholder="url do website" id="sponsor_website" value="' + sponsor.website + '" required /></div></div>' +
    '<div class="form-group"><textarea class="form-control form-control-lg" rows="6" placeholder="breve descrição" id="sponsor_description" required>' + sponsor.description + '</textarea></div>' +
    '<button type="submit" class="btn btn-outline-success btn-lg mr-2"><i class="fas fa-' + (isEdit ? 'edit' : 'plus-square') + '"></i> ' + (isEdit ? 'ATUALIZAR' : 'ADICIONAR') + '</button>' +
    '<button type="button" class="btn btn-outline-danger btn-lg" onclick="navigate(\'sponsors\')"><i class="fas fa-window-close"></i> CANCELAR</button>' +
    '</form></div></div></div></section>';
  
  document.getElementById('sponsorForm').onsubmit = function(e) {
    e.preventDefault();
    var formData = {
      name: document.getElementById('sponsor_name').value,
      animal: document.getElementById('sponsor_animal').value,
      website: document.getElementById('sponsor_website').value,
      description: document.getElementById('sponsor_description').value
    };
    
    if (isEdit) {
      updateSponsor(id, formData);
    } else {
      addSponsor(formData);
    }
    navigate('sponsors');
    return false;
  };
}

function renderExpertsList() {
  var experts = getExperts();
  var rows = '';
  for (var i = 0; i < experts.length; i++) {
    var e = experts[i];
    rows += '<tr><td class="pt-4">' + e.name + '</td><td class="pt-4">' + e.specialty + '</td><td class="pt-4">' + e.email + '</td><td>' +
      '<button class="btn btn-outline-success mr-2 mt-2" onclick="navigate(\'experts/edit/' + e.id + '\')"><i class="fas fa-edit"></i> EDITAR</button>' +
      '<button class="btn btn-outline-success mr-2 mt-2" onclick="navigate(\'experts/view/' + e.id + '\')"><i class="fas fa-search"></i> VER</button>' +
      '<button class="btn btn-outline-danger mr-2 mt-2" onclick="deleteExpert(' + e.id + ')"><i class="fas fa-trash-alt"></i> REMOVER</button>' +
      '</td></tr>';
  }
  
  document.getElementById('app-content').innerHTML =
    '<section class="page-section"><div class="container"><div class="text-center">' +
    '<h2 class="page-section-heading mt-5">GESTÃO DE ESPECIALISTAS</h2>' +
    '<div class="divider-custom"><div class="divider-custom-line"></div><div class="divider-custom-icon"><i class="fas fa-star"></i></div><div class="divider-custom-line"></div></div></div>' +
    '<div class="mb-4 text-center">' +
    '<button class="btn btn-outline-success mr-2 mt-2" onclick="navigate(\'experts/create\')"><i class="fas fa-plus-square"></i> ADICIONAR ESPECIALISTA</button>' +
    '<button class="btn btn-outline-info mr-2 mt-2" onclick="navigate(\'home\')"><i class="fas fa-bars"></i> MENU PRINCIPAL</button></div>' +
    '<div class="row"><div class="col-12 col-md-10 offset-md-1"><table class="table table-striped"><thead class="thead-dark"><tr><th>NOME</th><th>ESPECIALIDADE</th><th>EMAIL</th><th>AÇÕES</th></tr></thead><tbody>' +
    rows + '</tbody></table></div></div></div></section>';
}

function renderExpertView(id) {
  var expert = getExpert(id);
  if (!expert) {
    navigate('experts');
    return;
  }
  
  document.getElementById('app-content').innerHTML =
    '<section class="page-section"><div class="container"><div class="text-center">' +
    '<h2 class="page-section-heading mt-5">DETALHES DO ESPECIALISTA</h2>' +
    '<div class="divider-custom"><div class="divider-custom-line"></div><div class="divider-custom-icon"><i class="fas fa-star"></i></div><div class="divider-custom-line"></div></div></div>' +
    '<div class="row"><div class="col-12 col-md-8 offset-md-2"><div class="card mb-3">' +
    '<div class="card-body"><h5 class="card-title">' + expert.name + '</h5>' +
    '<p class="card-text mb-1"><strong>Especialidade:</strong> ' + expert.specialty + '</p>' +
    '<p class="card-text mb-1"><strong>Email:</strong> <a href="mailto:' + expert.email + '">' + expert.email + '</a></p>' +
    '<p class="card-text mb-1"><strong>Instituição:</strong> ' + expert.institution + '</p>' +
    '<p class="card-text"><strong>Bio:</strong> ' + expert.bio + '</p>' +
    '<button class="btn btn-outline-success mr-2 mt-2" onclick="navigate(\'experts/edit/' + expert.id + '\')"><i class="fas fa-edit"></i> EDITAR</button>' +
    '<button class="btn btn-outline-info mr-2 mt-2" onclick="navigate(\'experts\')"><i class="fas fa-arrow-left"></i> VOLTAR</button>' +
    '</div></div></div></div></div></section>';
}

function renderExpertForm(id) {
  var isEdit = id !== null;
  var expert = isEdit ? getExpert(id) : { name: '', specialty: '', email: '', institution: '', bio: '' };
  
  if (isEdit && !expert) {
    navigate('experts');
    return;
  }
  
  document.getElementById('app-content').innerHTML =
    '<section class="page-section"><div class="container"><div class="text-center">' +
    '<h2 class="page-section-heading mt-5">' + (isEdit ? 'EDITAR' : 'CRIAR') + ' ESPECIALISTA</h2>' +
    '<div class="divider-custom"><div class="divider-custom-line"></div><div class="divider-custom-icon"><i class="fas fa-star"></i></div><div class="divider-custom-line"></div></div></div>' +
    '<div class="row"><div class="col-12 col-md-8 offset-md-2"><form id="expertForm">' +
    '<div class="form-row"><div class="form-group col-md-6"><input type="text" class="form-control form-control-lg" placeholder="nome do especialista" id="expert_name" value="' + expert.name + '" required /></div>' +
    '<div class="form-group col-md-6"><input type="text" class="form-control form-control-lg" placeholder="especialidade (espécie/família)" id="expert_specialty" value="' + expert.specialty + '" required /></div></div>' +
    '<div class="form-row"><div class="form-group col-md-6"><input type="email" class="form-control form-control-lg" placeholder="email" id="expert_email" value="' + expert.email + '" required /></div>' +
    '<div class="form-group col-md-6"><input type="text" class="form-control form-control-lg" placeholder="instituição" id="expert_institution" value="' + expert.institution + '" required /></div></div>' +
    '<div class="form-group"><textarea class="form-control form-control-lg" rows="6" placeholder="breve biografia" id="expert_bio" required>' + expert.bio + '</textarea></div>' +
    '<button type="submit" class="btn btn-outline-success btn-lg mr-2"><i class="fas fa-' + (isEdit ? 'edit' : 'plus-square') + '"></i> ' + (isEdit ? 'ATUALIZAR' : 'ADICIONAR') + '</button>' +
    '<button type="button" class="btn btn-outline-danger btn-lg" onclick="navigate(\'experts\')"><i class="fas fa-window-close"></i> CANCELAR</button>' +
    '</form></div></div></div></section>';
  
  document.getElementById('expertForm').onsubmit = function(e) {
    e.preventDefault();
    var formData = {
      name: document.getElementById('expert_name').value,
      specialty: document.getElementById('expert_specialty').value,
      email: document.getElementById('expert_email').value,
      institution: document.getElementById('expert_institution').value,
      bio: document.getElementById('expert_bio').value
    };
    
    if (isEdit) {
      updateExpert(id, formData);
    } else {
      addExpert(formData);
    }
    navigate('experts');
    return false;
  };
}

// ========== DELETE HANDLERS ==========
function deleteSponsor(id) {
  if (confirm('Deseja mesmo remover este patrocinador?')) {
    deleteSponsorById(id);
    navigate('sponsors');
    setTimeout(handleRoute, 50);
  }
}

function deleteExpert(id) {
  if (confirm('Deseja mesmo remover este especialista?')) {
    deleteExpertById(id);
    navigate('experts');
    setTimeout(handleRoute, 50);
  }
}

// ========== INIT ==========
window.onhashchange = handleRoute;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initData();
    handleRoute();
  });
} else {
  initData();
  handleRoute();
}
