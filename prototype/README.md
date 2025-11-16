# Protótipo Funcional - Animalec

Protótipo interativo em HTML/CSS/JavaScript vanilla com navegação completa e operações CRUD para **Patrocinadores** e **Especialistas**.

## Funcionalidades

### Navegação
- **Home**: página inicial com acesso às diferentes secções
- **Patrocinadores**: listagem, visualização, criação, edição e remoção
- **Especialistas**: listagem, visualização, criação, edição e remoção

### CRUD Completo
- **Create**: formulários de criação com validação
- **Read**: listagens e visualizações detalhadas
- **Update**: formulários de edição pré-preenchidos
- **Delete**: remoção com confirmação

### Persistência
- Dados iniciais (mock) carregados automaticamente no primeiro acesso
- Persistência em `localStorage` — alterações mantêm-se entre sessões
- Método `resetData()` disponível para repor dados iniciais

## Estrutura de Ficheiros

```
prototype/
├── index.html       # Página principal com navbar e estrutura
├── app.js           # Lógica: DataManager, Router, Views
├── style.css        # Estilos customizados
├── data.json        # Dados mock (referência, não usado em runtime)
└── README.md        # Esta documentação
```

## Como Usar

1. **Abrir o protótipo**:
   - Abrir `index.html` diretamente no navegador (duplo clique)

2. **Navegação**:
   - Usar a navbar superior para aceder a Patrocinadores/Especialistas
   - Clicar nos botões da home também redireciona

3. **Operações CRUD**:
   - **Listar**: visualizar todos os itens numa tabela
   - **Ver**: clicar em "VER" para detalhes completos
   - **Adicionar**: botão "+ ADICIONAR" no topo da listagem
   - **Editar**: botão "EDITAR" na linha ou na vista de detalhe
   - **Remover**: botão "REMOVER" (pede confirmação)

4. **Persistência**:
   - Todas as alterações ficam guardadas no `localStorage`
   - Recarregar a página mantém os dados
   - Para repor dados iniciais:
     ```javascript
     // Abrir DevTools Console e executar:
     db.resetData();
     location.reload();
     ```

## Tecnologias

- **HTML5** puro
- **CSS3** (Bootstrap 4.3 + tema Animalec + custom)
- **JavaScript ES6** vanilla (Classes, arrow functions, template literals)
- **localStorage API** para persistência
- **Hash-based routing** (`window.location.hash`)

## Estrutura de Dados

### Patrocinador (Sponsor)
```json
{
  "id": 1,
  "name": "Nome do Patrocinador",
  "animal": "Animal Associado",
  "website": "https://exemplo.com",
  "logo": "URL da imagem",
  "description": "Descrição textual"
}
```

### Especialista (Expert)
```json
{
  "id": 1,
  "name": "Dr. Nome Completo",
  "specialty": "Mamíferos (Felidae)",
  "email": "email@instituicao.pt",
  "institution": "Nome da Instituição",
  "photo": "URL da fotografia",
  "bio": "Biografia resumida"
}
```

## Rotas (Hash)

- `#home` — Página inicial
- `#sponsors` — Listagem de Patrocinadores
- `#sponsors/view/{id}` — Detalhe de Patrocinador
- `#sponsors/create` — Criar Patrocinador
- `#sponsors/edit/{id}` — Editar Patrocinador
- `#experts` — Listagem de Especialistas
- `#experts/view/{id}` — Detalhe de Especialista
- `#experts/create` — Criar Especialista
- `#experts/edit/{id}` — Editar Especialista

## Notas

- **Sem backend**: todos os dados são geridos no cliente
- **Validação básica**: formulários com atributo `required`
- **IDs automáticos**: gerados sequencialmente ao criar novos itens
- **Responsivo**: usa Bootstrap grid system
- **Ícones**: Font Awesome 5.6.3 via CDN
- **Tema**: replica visual dos mockups do Animalec