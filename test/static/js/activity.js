let nangua = document.querySelector('.hat_nangua')
let water = document.querySelector('.mofa_water')
let gongxian = document.querySelector('.gongxian')
let meili = document.querySelector('.meili')

nangua.addEventListener('click', function(){
  water.children[0].src = 'http://localhost:8080/static/img/魔法药水1.png'
  this.children[0].src = 'http://localhost:8080/static/img/巫婆南瓜.png'
})

water.addEventListener('click', function() {
  nangua.children[0].src = 'http://localhost:8080/static/img/巫婆南瓜1.png'
  this.children[0].src = 'http://localhost:8080/static/img/魔法药水.png'
})

gongxian.addEventListener('click', function() {
  meili.children[0].src = 'http://localhost:8080/static/img/魅力榜.png'
  this.children[0].src = 'http://localhost:8080/static/img/贡献榜1.png'
})

meili.addEventListener('click', function() {
  gongxian.children[0].src = 'http://localhost:8080/static/img/贡献榜.png'
  this.children[0].src = 'http://localhost:8080/static/img/魅力榜1.png'
})