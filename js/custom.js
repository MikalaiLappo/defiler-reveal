var mounted = false
function RefreshChatData(data) {
  if (!data) data = chatContent
  if (data === chatContent && mounted) return
  if (data !== undefined) chatContent = data
  else data = window.chatContent
  let ChatStrings = data.split('\n'),
    newContent = ''
  for (let i = 0; i < ChatStrings.length; i++) {
    let t = ChatStrings[i].split('`')
    if (t.length !== 6) continue
    let uid = t[1],
      Sys = t[2],
      ActTime = t[3],
      msg = t[4],
      myself =
        (Sys === 'CHAT' && User.id === uid * 1) ||
        (Sys === 'WHISPER' && uid.startsWith(User.id + ',')),
      rid = uid.indexOf(',') >= 0 ? uid.split(',')[0] * 1 : uid * 1
    //        if (Sys === "HIDDEN" && User.id !== rid)
    //            continue;
    if (ignoreList[rid] !== undefined && rid !== 1) continue
    if (Sys === 'WHISPER') {
      t = uid.split(',')
      //            if (!t.includes("" + User.id))
      //                continue;
      //            if (User.id === rid) {
      if (true) {
        const id = t[1] * 1
        t = msg.split('<m>')
        msg = t[0] + '<m>[c6]#' + id + '[/c6] [c1]>[/c1] ' + t[1]
      }
    }
    if (myself) msg = replaceString(msg, '<n>', '<div class="cht_my_nck">')
    if (~msg.indexOf(User.name) && Sys === 'CHAT' && !myself) {
      msg = replaceString(msg, '<n>', '<div class="cht_nck_to_me">')
      msg = replaceString(msg, '<t>', '<div class="cht_tm_to_me">')
      msg = replaceString(msg, '<m>', '<div class="cht_msg_to_me"> ')
    } else if (['CHAT'].includes(Sys)) {
      msg = replaceString(msg, '<n>', '<div class="cht_nck">')
      msg = replaceString(msg, '<t>', '<div class="cht_tm">')
      msg = replaceString(msg, '<m>', '<div class="cht_msg"> ')
    } else if (['SYSTEM'].includes(Sys)) {
      msg = replaceString(msg, '<n>', '<div class="cht_nck_ad3">')
      msg = replaceString(msg, '<t>', '<div class="cht_tm_ad3">')
      msg = replaceString(msg, '<m>', '<div class="cht_msg_ad3">')
    } else {
      msg = replaceString(msg, '<n>', '<div class="cht_nck_ad">')
      msg = replaceString(msg, '<t>', '<div class="cht_tm_ad">')
      msg = replaceString(msg, '<m>', '<div class="cht_msg_ad"> ')
    }
    msg = replaceString(msg, '</n>', ' <buttons></div>')
    msg = replaceString(msg, '</t>', '</div>')
    msg = replaceString(msg, '</m>', ' </div>')
    msg = replaceString(msg, '<id>0</id>', '')
    msg =
      NICKNAME_BUTTONS && ['CHAT', 'WHISPER'].includes(Sys) && !myself
        ? replaceString(
            msg,
            '<buttons>',
            '<a title="' +
              rid +
              '" href="#" class="hidden_link" onclick="ignore_user(\'' +
              rid +
              '\');">hide</a>'
          )
        : replaceString(msg, '<buttons>', '')
    msg = replaceChatSmiles(msg)
    newContent += msg
  }
  document.getElementById('chat_text').innerHTML = newContent
  mounted = true
}
