let allUsers = []; // Array de todos usuarios 
let search = null; // Input de Busca
let usersFound = []; // Array de usuarios encontrados

window.addEventListener('load', () => {
    search = document.querySelector('#search');
    userList = document.querySelector('.user-list');
    statistic = document.querySelector('.statistic-list');

    loadUsers();
    //handleSearch();
    handleSubmit();
    render();
    teste();
});

//Função inicial pra carregar os usuarios no Array allUsers
async function loadUsers() {
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();
    allUsers = json.results.map(user => {
        const {name, picture, dob, gender} = user;
        return {
            name: name.first + ' ' + name.last,
            picture: picture.large,
            dob: dob.age,
            gender
        };
    });
}

//Função de busca dos usuarios 
// function searchUser(char){
//     allUsers.forEach(user => {
//         if(user.name.toLowerCase().indexOf(char) != -1) {
//             usersFound = [...usersFound, user];
//         }
//     });
//     render();
//     usersFound = [];
// }

//Função que lida com a leitura do input e envio pelo botão Enter 
// function handleSearch() {
//     function handleTyping(e) {
//         var hasText = !!e.target.value && e.target.value.trim() != '';
//         if(!hasText) {
//             clearInput();
//             return;
//         }

//         if(e.key === 'Enter') {
//             searchUser(e.target.value.toLowerCase());
//             clearInput();
//         }
//     }

//     search.addEventListener('keyup', handleTyping);
//     search.focus();
// }

//Função que lida com o envio pelo botão
function handleSubmit() {
    function handleButton(e){
        e.preventDefault();
        var hasText = !!e.target[0].value && e.target[0].value.trim() != '';
        if(!hasText) {
            clearInput();
            return;
        }
        
        const char = e.target[0].value.toLowerCase(); 
        usersFound = allUsers
            .filter(user => user.name.toLowerCase().includes(char))
            .sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
        render();
        clearInput();
    }

    var form = document.querySelector('form');
    form.addEventListener('submit', handleButton);
    search.focus();
}

//Função pra carregar as renderizações
function render() {
    usersList();
    statisticList();
}

//Função que renderiza a lista de usuarios encontrados na tela 
function usersList() {
    if(Array.isArray(usersFound) && usersFound.length){ // array exists and is not empty
        let usersHTML = `<h2>${usersFound.length} usuario(s) encontrado(s)</h2>`;
        usersFound.forEach(user => {
            const {name, picture, dob} = user;
            const userHTML = `
                <div class="user">
                    <div>
                        <img src="${picture}" alt="${name}" />
                    </div>
                    <div>
                        <p>${name}<p/>
                    </div>
                    <div>
                        <p>, ${dob} anos</p>
                    </div>
                </div>
            `;

            usersHTML += userHTML;
        });
        userList.innerHTML = usersHTML;
    }else {
        const userHTML = `
            <h2> Nenhum usuário filtrado </h2>
        `;
        userList.innerHTML = userHTML;
    }
}

//Função que renderiza as estátisticas na tela 
function statisticList() {
    if(Array.isArray(usersFound) && usersFound.length) {
        const mens = usersFound.filter(user => user.gender === 'male');
        const womens = usersFound.length - mens.length;
        const totalAges = usersFound.reduce((acc, cur) => {
            return acc + cur.dob;
        }, 0);
        const mediaAges = totalAges/usersFound.length;
        const statisticHTML = `
            <h2> Estatísticas </h2>
            <p>Sexo masculino: ${mens.length}</p>
            <p>Sexo feminino: ${womens}</p>
            <p>Soma das idades: ${totalAges}</p>
            <p>Média das idades: ${mediaAges}</p>
    `;
        
        statistic.innerHTML = statisticHTML;
    }else {
        const statisticHTML = `
            <h2> Nada a ser exibido </h2>
        `;
        statistic.innerHTML = statisticHTML;
    }
}

//Limpa o input apos o uso dele 
function clearInput() {
    search.value = '';
    search.focus();
}

function teste() {
    var a = { id: 2};
    var b = a;

    a.id = 4;
    console.log(b);
}