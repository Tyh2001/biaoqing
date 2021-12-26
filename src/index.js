
function $ (Class) {
  return typeof Class === "string" ? document.querySelector(Class) : null;
}

function $Al (ClassAll) {
  return typeof ClassAll === "string"
    ? document.querySelectorAll(ClassAll)
    : null;
}

function $D (id) {
  return typeof id === "string" ? document.getElementById(id) : null;
}

// 渲染表情列表
const emojeLiList = ['高兴', '大哭', '紧张', '可爱', '亲亲', '生气', '淘气', '难受', '呲牙', '笑哭', '色', '忧愁', '飞吻', '失落', '害怕', '恐惧', '不屑', '冒金星', '哼哼', '汗']
const qqliList = ['微笑', '撇嘴', '色', '发呆', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困']
const EmoticonsliList = ['(*^▽^*)', '(^_−)☆', 'o(´^｀)o', 'o(╥﹏╥)o', '→_→', 'ψ(｀ー´)ψ', '(•́へ•́╬)', '(ー_ー)', '|ू･ω･` )', '(✪ω✪)', '(ಥ_ಥ)', '┗( ▔, ▔ )┛', '(‾◡◝)', '(≧∇≦)ﾉ', '(❁´◡`❁)', '(*＾-＾*)', '(*^_^*)', '`(*>﹏0*)′', '(✿◡‿◡)', 'O(∩_∩)O', '( •̀ ω •́ )✧', '0.0', '-.-', 'ƪ(˘⌣˘)ʃ']

/**
 * 用于渲染 emoji表情 / QQ表情
 * @param {array} arr 源数组
 * @param {string} className class 名称
 * @param {string} type 类型 em / qq
 * @param {string} folder 文件夹
 * @param {string} container 容器
 * @param {string} Suffix 后缀名
 */
function _RenderingExpressionList (arr, className, type, folder, container, Suffix) {
  const newUL = document.createElement('ul')
  arr.forEach((item, index) => {
    const newLi = document.createElement('li')
    newLi.setAttribute('class', className)
    newLi.setAttribute('alt', `[${type}_${index + 1}]`)
    newLi.setAttribute('title', item)

    newLi.innerHTML = `<img src="image/${folder}/${index + 1}.${Suffix}">`
    $(container).appendChild(newLi)
  })
}

_RenderingExpressionList(emojeLiList, 'emojeLi', 'em', 'emoji', '.expressionMenu-UL-01', 'png')
_RenderingExpressionList(qqliList, 'QQLi', 'qq', 'QQ', '.expressionMenu-UL-02', 'gif')

// 渲染颜文字
EmoticonsliList.forEach(element => {
  const newLi = document.createElement('li')
  newLi.setAttribute('class', 'Emoticons')
  newLi.innerHTML = element
  $('.expressionMenu-UL-03').appendChild(newLi)
})

// 表情菜单切换选项卡
const wordsSwitch = $Al('.wordsSwitch')
const expressionMenu = $Al('.expressionMenu')
for (let i = 0; i < expressionMenu.length; i++) {
  wordsSwitch[i].onclick = function () {
    for (let j = 0; j < expressionMenu.length; j++) {
      expressionMenu[j].style.display = 'none'
      wordsSwitch[j].style.color = 'black'
    }
    expressionMenu[i].style.display = 'block'
    wordsSwitch[i].style.color = '#ff8140'
  }
}

// 添加颜文字表情
const Emoticons = $Al('.Emoticons')
for (let i = 0; i < Emoticons.length; i++) {
  Emoticons[i].onclick = function () {
    $D('textarea').value += ` ${Emoticons[i].innerHTML} `
  }
}

// 添加Emoje表情
const emojeLi = $Al('.emojeLi')
for (let i = 0; i < emojeLi.length; i++) {
  emojeLi[i].onclick = function () {
    // 获取到点击表情的 alt 属性 并且加到文本框内
    const emojeLiAlt = emojeLi[i].getAttribute('alt')
    $D('textarea').value += emojeLiAlt
  }
}

// 添加QQ表情
const QQLi = $Al('.QQLi')
for (let i = 0; i < QQLi.length; i++) {
  QQLi[i].onclick = function () {
    const QQLiAlt = QQLi[i].getAttribute('alt')
    $D('textarea').value += QQLiAlt
  }
}

/**
 * 表情转换
 * @param {string} str 路径参数
 * @returns 
 */
function transformation (str) {
  str = str.replace(/\[em_([0-9]*)\]/g, "<img src='./image/emoji/$1.png'>")
  str = str.replace(/\[qq_([0-9]*)\]/g, "<img src='./image/QQ/$1.gif'>")
  return str
}

// 将选择的图片添加到容器中
const file = $D('file') // file input
const previewPicturesBox = $('.previewPicturesBox') // 装图片的容器

$('.addImg').onclick = function () {
  file.click()
  // 当文本框发生变化时候
  file.onchange = function () {
    const fileLength = file.files.length; // 获取到上传文件的数组的长度
    for (let i = 0; i < fileLength; i++) {
      const blogImg = window.URL.createObjectURL(file.files[i])
      const previewPictures = document.createElement('img') // 新建一个 img 标签
      previewPictures.src = blogImg
      previewPictures.setAttribute('class', 'previewPicturesTop')
      previewPicturesBox.appendChild(previewPictures)
    }
  }
}

// 点击发布按钮
$('.release-btn').addEventListener('click', function () {
  if ($D('textarea').value === '') {
    alert('内容为空不能发表！')
    return
  }
  const newLi = document.createElement('li') // 新建一个 li 标签
  // 表情替换 点击发布将表情添加到列表中
  let textareaVal = $D('textarea').value
  textareaVal = transformation(textareaVal)
  const divContent = document.createElement('div') // 新建一个 div 标签
  divContent.innerHTML = textareaVal
  newLi.appendChild(divContent)

  // 获取选择上传的图片 添加到列表中
  const previewPicturesImg = $Al('.previewPicturesTop') // 获取到所有的需要上传的图片
  for (let i = 0; i < previewPicturesImg.length; i++) {
    const previewPicturesSrc = previewPicturesImg[i].getAttribute('src') // 获取到每个需要上传图片的 Src属性值
    const blogImgBoxImg = document.createElement('img') // 新建一个 img 标签
    blogImgBoxImg.setAttribute('src', previewPicturesSrc)
    blogImgBoxImg.setAttribute('class', 'previewPictures')
    newLi.appendChild(blogImgBoxImg) // 将新建的 img 标签放到容器里
  }

  // 将发布的文本内容添加到新的的 ol 的 li 列表中中去
  $('.testBoxTitle').appendChild(newLi)

  // 清空文本框 & 上传的图片 & 展示图片预览的盒子
  $D('textarea').value = ''
  $D('file').value = ''
  $('.previewPicturesBox').innerHTML = ''
})