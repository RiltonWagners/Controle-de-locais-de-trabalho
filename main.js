window.addEventListener('load', function () {
  document.querySelector('#button-add').addEventListener('click', cadastrar)
})

//Função para cadastrar os itens(objetos) da SessionStorage (arrLocaisTrabalho)
function cadastrar() {
  //Verifica se os campos foram preechidos
  if (
    document.getElementById('predio').options[0].selected == true ||
    document.getElementById('local_trabalho').value == ''
  ) {
    alert('Favor preencher os campos!')
  } else {
    //Verifica se o navegador suporte html5
    if (typeof sessionStorage == 'undefined') {
      alert('Seu navegador não suporta HTML5 sessionStorage.')
    } else {
      //Coloca o valor do combobox Prédio na variável predio
      var predio = document.getElementById('predio').value

      //Coloca o valor do input Local de Trabalho na variável local_trabalho
      var local_trabalho = document.getElementById('local_trabalho').value

      // Cria o array e adiciona os dados (predio e local_trabalho)
      var LocalTrabalho = {
        predio: document.getElementById('predio').value,
        local_trabalho: document.getElementById('local_trabalho').value
      }
      // Salva a lista alterada

      // Pega o array cadastrado, se não houver cria um array vazio
      if (sessionStorage.getItem('arrLocaisTrabalho') == null) {
        sessionStorage.setItem('arrLocaisTrabalho', '[]')
      }
      // Pega o array cadastrado, e salva em arrLocaisTrabalhoOld
      var arrLocaisTrabalhoOld = JSON.parse(
        sessionStorage.getItem('arrLocaisTrabalho')
      )

      // Envia os dados (objeto) para o array
      arrLocaisTrabalhoOld.push(LocalTrabalho)

      // Insere os dados (objeto) na SessionStorage arrLocaisTrabalho
      sessionStorage.setItem(
        'arrLocaisTrabalho',
        JSON.stringify(arrLocaisTrabalhoOld)
      )

      //Limpa os campos (combobox Predio e input Local de Trabalho)
      document.getElementById('predio').options[0].selected = true
      document.getElementById('local_trabalho').value = ''

      //Chama a função para atualizar a tabela exibindo os dados cadastrados
      exibir()

      alert('Cadastrado com sucesso!')
    }
  }
}

//Função para consultar o Array (arrLocaisTrabalho) e exibir os itens(objetos) da SessionStorage (arrLocaisTrabalho)
function exibir() {
  //Remove todas as linhas da tabela para inseri com os dados atualizados
  var tbody = document.querySelector('tbody')
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.lastChild)
  }

  //Verifica se existem dados (objetos) na SessionStorage no array arrLocaisTrabalho
  if (sessionStorage.length > 0) {
    var arrayFromStroage = JSON.parse(
      sessionStorage.getItem('arrLocaisTrabalho')
    )
    //Percorre por todo o array
    for (let i = 0; i < arrayFromStroage.length; i++) {
      // Cria os elementos html
      var tr = document.createElement('tr')
      var tdp = document.createElement('td')
      var tdlt = document.createElement('td')
      var tdae = document.createElement('td')
      var cmb = document.createElement('select')
      var tlocal = document.createElement('input')
      var btneditar = document.createElement('img')
      var button = document.createElement('img')

      //Adiciona os respectivos atributos nos elementos html
      tlocal.setAttribute('type', 'text')
      tlocal.setAttribute('id', 'input_local_trabalho_' + i)
      tlocal.setAttribute('class', 'form-control form-control-sm')
      cmb.setAttribute('id', 'cmb_' + i)
      cmb.setAttribute('class', 'form-control form-control-sm')
      tdae.setAttribute('class', 'center')
      btneditar.setAttribute('data-toggle', 'tooltip')
      btneditar.setAttribute('title', 'Editar')

      btneditar.setAttribute('src', 'images/pencil-square.svg')
      btneditar.setAttribute('onclick', 'editar(' + i + ')')
      button.setAttribute('data-toggle', 'tooltip')
      button.setAttribute('title', 'Excluir')
      button.setAttribute('src', 'images/trash.svg')
      button.setAttribute('onclick', 'deletar(' + i + ')')

      var arrLocais_Trabalho = JSON.parse(sessionStorage.arrLocaisTrabalho)

      //Crie o elemento combobox na linha da tabela e seleciona a opção cadastrada
      for (let x = 1; x < 6; x++) {
        var tpredio = document.createElement('option')
        tpredio.setAttribute('class', 'form-control')
        tpredio.setAttribute('id', 'option_' + x)
        tpredio.value = 'Prédio ' + x
        tpredio.text = 'Prédio ' + x
        cmb.add(tpredio, cmb.options[x])
        if (tpredio.text == arrLocais_Trabalho[i].predio) {
          tpredio.setAttribute('selected', true)
        }
      }

      //Adicina os elementos filhos (atributos) aos elementos pai (elementos html)
      tlocal.setAttribute('value', arrLocais_Trabalho[i].local_trabalho)
      tdp.appendChild(cmb)
      tdlt.appendChild(tlocal)
      tdae.appendChild(btneditar)
      tdae.appendChild(button)
      tr.appendChild(tdp)
      tr.appendChild(tdlt)
      tr.appendChild(tdae)

      //Inseri o elemento filho (tr linhas da tabela) ao elemento pai (tbody)
      tbody.appendChild(tr)
    }
  } else {
    //Informa que não existem itens na Array/SessionStorage
    alert('Nada foi Gravado!')
  }
}

//Função para deletar objeto do array (arrLocaisTrabalho). Recebe como parâmetro r (index da linha da tabela)
function deletar(r) {
  //Mensagem para confirmar a exclusão
  if (confirm('Deseja realmente excluir?')) {
    var tbody = document.querySelector('tbody')

    // Pega o array da SessioStorage (arrLocaisTrabalho), e salva em arrLocaisTrabalhoOld
    var arrLocaisTrabalhoOld = JSON.parse(
      sessionStorage.getItem('arrLocaisTrabalho')
    )

    //Percorre por todo o array (arrLocaisTrabalhoOld) até localizar o obejto referente ao parâmetro r recebido e remove-o. Em seguida inseri o array atualizado na SessionStorage arrLocaisTrabalho
    for (let i = 0; i < arrLocaisTrabalhoOld.length; i++) {
      if (i === r) {
        console.log(r)
        arrLocaisTrabalhoOld.splice(i, 1)
        sessionStorage.setItem(
          'arrLocaisTrabalho',
          JSON.stringify(arrLocaisTrabalhoOld)
        )
      }
    }

    //Exclui a linha da tabela que foi clicado
    var target = event.target
    target.closest('tr').remove()
  }
}

//Função para fazer alteração dos dados do objeto do array (arrLocaisTrabalho). Recebe como parâmetro r (index da linha da tabela)
function editar(r) {
  //Mensagem para confirmar a alteração
  if (confirm('Confirmar a alteração?')) {
    var tbody = document.querySelector('tbody')

    // Pega o array da SessioStorage (arrLocaisTrabalho), e salva em arrLocaisTrabalhoOld
    var arrLocaisTrabalhoOld = JSON.parse(
      sessionStorage.getItem('arrLocaisTrabalho')
    )

    //Percorre por todo o array (arrLocaisTrabalhoOld) até localizar o obejto referente ao parâmetro r recebido e então, é acessado e feita a alteração na SessionStorage no array arrLocaisTrabalho
    for (let i = 0; i < arrLocaisTrabalhoOld.length; i++) {
      if (i === r) {
        console.log(document.getElementById('cmb_' + i).value)
        arrLocaisTrabalhoOld[i].predio = document.getElementById(
          'cmb_' + i
        ).value
        arrLocaisTrabalhoOld[i].local_trabalho = document.getElementById(
          'input_local_trabalho_' + i
        ).value

        sessionStorage.setItem(
          'arrLocaisTrabalho',
          JSON.stringify(arrLocaisTrabalhoOld)
        )
      }
    }

    alert('Alteração realizada com sucesso!')

    //Chama a função exibir() para mostrar os dados atualizados na tabela
    exibir()
  } else {
    //Caso não confire a alteração (na mensagem) chama a função exibir() para mostrar os dados atualizados na tabela
    exibir()
  }
}
