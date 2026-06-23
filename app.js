/* =========================================================================
   등불 일지 — 성격유형 검사 (바닐라 JS)
   ========================================================================= */

/* 한 등불에서 보여줄 보기 개수 (10개 중 무작위 N개) */
const PICK = 5;

/* ===== 캐릭터(결과 유형) ===== */
const CHARS = {
  quix:{name:"돈키호테", work:"세르반테스 『돈키호테』", alias:"풍차에 맞선 기사", desc:"세상이 비웃어도 당신은 이상을 포기하지 않는다. 무모해 보일지라도, 당신에게 꿈은 현실보다 진하다. 보이지 않는 별을 향해 먼저 걸어가는 사람이다."},
  gats:{name:"개츠비", work:"피츠제럴드 『위대한 개츠비』", alias:"초록 불빛의 몽상가", desc:"당신은 멀어지는 불빛을 향해 끝내 손을 뻗는다. 닿지 못할 줄 알면서도 동경을 포기하지 않는다. 그 순정한 갈망이 당신을 남다르게 한다."},
  haml:{name:"햄릿", work:"셰익스피어 『햄릿』", alias:"머뭇거리는 왕자", desc:"당신은 쉽게 결정하지 않는다. 모든 선택을 깊이 되묻는 사람이다. 그 망설임은 우유부단이 아니라, 함부로 살지 않으려는 진지함이다."},
  jane:{name:"제인 에어", work:"샬럿 브론테 『제인 에어』", alias:"꺾이지 않는 자유혼", desc:"당신은 어떤 그물에도 갇히지 않는다. 가난하고 작아도 스스로를 존중하며, 자기 영혼으로 세상에 맞선다. 그 당당함이 당신의 품격이다."},
  rask:{name:"라스콜니코프", work:"도스토옙스키 『죄와 벌』", alias:"스스로를 심판한 자", desc:"당신은 옳고 그름을 끝까지 따져 묻는 사람이다. 죄책감마저 외면하지 않는다. 그 무거움이 결국 당신을 더 깊은 회복으로 데려간다."},
  valj:{name:"장 발장", work:"위고 『레미제라블』", alias:"은촛대의 사람", desc:"당신은 단 한 번의 자비를 평생의 빛으로 삼는다. 어둠을 지나온 사람만이 아는 따뜻함으로, 누군가를 사랑하는 일에서 거룩함을 본다."},
  doro:{name:"도로시", work:"바움 『오즈의 마법사』", alias:"집으로 가는 아이", desc:"먼 길을 돌아도 당신은 끝내 돌아갈 곳을 안다. 당신에게 가장 큰 모험의 끝은 언제나 집이다. 평범함의 소중함을 아는 사람이다."},
  alyo:{name:"알료샤", work:"도스토옙스키 『카라마조프가의 형제들』", alias:"낮은 곳의 사랑", desc:"당신은 미워하기보다 끌어안는다. 신앙과 사랑으로 사람을 본다. 가장 어두운 곳에서도 당신은 빛이 꺼지지 않는다고 믿는 사람이다."},
  anna:{name:"안나 카레니나", work:"톨스토이 『안나 카레니나』", alias:"불꽃을 택한 여인", desc:"당신은 마음에 솔직하다. 안전보다 진심을 따르고, 사랑 앞에서 자신을 속이지 않는다. 그 뜨거움이 당신을 살아 있게 한다."},
  ishm:{name:"이슈메일", work:"멜빌 『모비 딕』", alias:"바다로 떠난 항해자", desc:"당신은 답답할 때 더 넓은 곳으로 떠난다. 거대한 운명 앞에서도 조급해하지 않고, 끝내 살아남아 이야기를 전하는 관찰자다."},
  greg:{name:"그레고르 잠자", work:"카프카 『변신』", alias:"방 안에 남겨진 자", desc:"당신은 묵묵히 견디는 사람이다. 알아주지 않아도 제 몫을 다한다. 소외 속에서도 가족과 책임을 먼저 떠올리는, 조용히 깊은 사람이다."},
  heath:{name:"히스클리프", work:"에밀리 브론테 『폭풍의 언덕』", alias:"황야의 영혼", desc:"당신은 누구의 틀에도 길들지 않는다. 한번 향한 마음은 영혼이 닳도록 타오른다. 그 격정은 약함이 아니라 누구도 막지 못하는 힘이다."},
  liza:{name:"엘리자베스 베넷", work:"오스틴 『오만과 편견』", alias:"재치 있는 자유인", desc:"당신은 남의 잣대에 자신을 맞추지 않는다. 첫인상을 의심하고 제 눈으로 다시 본다. 틀렸음을 인정할 줄 아는 그 용기가 당신의 매력이다."}
};

/* ===== 등불(질문) ===== */
const LANTERNS = [
  { no:"LANTERN 01", topic:"꿈", vow:"나는 자주 꿈을 너무 크게 잡거나, 남이 정해준 길을 내 꿈으로 착각하곤 했다. 이 등불에 적힌 문답 앞에서 다짐한다. 닿지 못할 별이라도 내 심장이 가리키는 쪽이라면 부끄러워하지 않기로. 다만 그 꿈이 누군가를 짓밟지 않도록, 선함을 먼저 두기로.", status:"첫 번째 길을 나섰다. 길 끝에서 희미하게 불빛이 비친다 — '당신에게 꿈이란 무엇인가.' 어둠 속 형체들이 답했다.", q:"꿈에 대하여",
    opts:[{c:"quix",line:"자네, 있는 그대로의 세상이 아니라 마땅히 그러해야 할 세상을 보세나! 그것이 곧 우리의 꿈이 아니겠는가!",src:"돈키호테 — 이상주의 주제"},{c:"gats",line:"나는 그 초록빛 불빛을 믿었네. 해마다 우리 앞에서 멀어져만 가는, 그 황홀한 미래를.",src:"위대한 개츠비 — 9장 결말부"},{c:"haml",line:"호두 껍데기 속에 갇힌다 한들, 악몽만 없다면 나는 무한한 우주의 왕이라 여길 수 있으련만.",src:"햄릿 — 2막 2장"},{c:"jane",line:"나는 새가 아니다. 어떤 그물도 나를 가두지 못한다. 나는 독립된 의지를 지닌 자유로운 인간이다.",src:"제인 에어 — 23장"},{c:"rask",line:"나는 한 마리 이가 아니라 인간임을 증명하고 싶었지. 허나 그 꿈이 도리어 나를 짓밟더군.",src:"죄와 벌 — 비범인 사상"},{c:"valj",line:"한때 나는 어둠뿐인 사람이었다. 허나 단 한 번의 자비가, 사람을 정직하게 살고자 하는 자로 바꾸어 놓는 법이다.",src:"레미제라블 — 주교의 은촛대"},{c:"doro",line:"무지개 너머 어딘가를 그렸지만, 결국 내 꿈은 돌아갈 집이었어요.",src:"오즈의 마법사 — 귀향 주제"},{c:"alyo",line:"우리는 무엇보다 먼저 선하고, 그다음 정직하며, 서로를 결코 잊지 말아야 해요.",src:"카라마조프가의 형제들 — 에필로그 연설"},{c:"anna",line:"내 심장이 뛰는 쪽, 난 그걸 꿈이라 불러. 남이 정해준 안온함 따위 내 꿈이 아니야.",src:"안나 카레니나 — 정념의 추구"},{c:"ishm",line:"마음이 음울해지면 나는 바다를 떠올리네. 떠나는 것, 그 자체가 내 오랜 꿈이지.",src:"모비 딕 — 1장 도입부"}] },
  { no:"LANTERN 02", topic:"불안과 평안", vow:"불안이 밀려올 때마다 나는 도망치거나 외면하려 했다. 그러나 글을 남긴 이의 말들을 듣고 마음이 바뀌었다. 흔들리는 나를 미워하지 않고, 두려움은 맞설 때 작아진다는 말을 믿고, 오늘 할 일을 하는 것에서 평안을 찾기로 말이다.", status:"미래든, 지금 내 자리든, 불안은 언제든 밀려온다. 그 순간이 온다면, 어떻게 대처해야 하는가. 형체들이 답했다.", q:"불안에 대한 소견",
    opts:[{c:"alyo",line:"이 땅에서 두려워할 것은 없어요. 다만 서로 사랑하기를 멈추는 것만 두려워하세요.",src:"카라마조프가의 형제들 — 조시마 장로"},{c:"doro",line:"무서워도 길은 있어요. 노란 벽돌길을 한 걸음씩 따라가다 보면, 결국 닿거든요.",src:"오즈의 마법사 — 노란 벽돌길"},{c:"haml",line:"참새 한 마리 떨어짐에도 섭리가 있는 법. 올 것은 오고야 마니, 마음의 준비가 전부로다.",src:"햄릿 — 5막 2장"},{c:"jane",line:"홀로일수록, 벗이 없을수록, 기댈 곳이 없을수록 — 나는 더욱 나 자신을 존중한다.",src:"제인 에어 — 27장"},{c:"rask",line:"불안이란 아직 답을 찾지 못했다는 신호지. 외면하지 말고 끝까지 따져 물어야 해.",src:"죄와 벌 — 자기심문"},{c:"valj",line:"눈동자가 어둠 속에서 빛을 찾아내듯, 영혼은 불행 속에서 끝내 하느님을 찾아내는 것이다.",src:"레미제라블 — 발장의 만년"},{c:"gats",line:"불안할수록 나는 그 불빛을 향해 팔을 뻗었네. 다시 시작할 수 있다고 믿으면서.",src:"위대한 개츠비 — 초록 불빛"},{c:"liza",line:"불안에 휘둘리느니 차라리 웃어버려요. 어리석음과 변덕쯤은, 웃을 줄 아는 내겐 좋은 약이거든요.",src:"오만과 편견 — 엘리자베스의 기질"},{c:"anna",line:"불안을 숨기지 마. 떨리는 마음까지 끌어안을 때, 비로소 내가 되는 거잖아.",src:"안나 카레니나 — 감정에의 충실"},{c:"greg",line:"불안해도 저는 아침이면 일어났어요. 해야 할 일을 하는 것, 그게 제 평안이었죠.",src:"변신 — 가장으로서의 일상"}] },
  { no:"LANTERN 03", topic:"고통", vow:"고통을 그저 피하고 싶은 벌로만 여겼던 나를 돌아봤다. 다이아몬드가 어둠 속에서 나오듯, 견딘 자리에 진짜 내가 남는다는 걸 기억하려 한다. 그리고 아파하는 사람 곁에 함께 있어 주는 사람이 되기로 다짐한다.", status:"삶의 가장 어두운 구간에 닿았다. 견디기 힘든 무게가 당신의 어깨를 짓누른다. 이 무게를 과연 견딜 수 있을까? 형체들이 응답했다.", q:"고통을 어떻게 받아들여야 하는가?",
    opts:[{c:"rask",line:"넓은 지성과 깊은 마음을 지닌 자에게, 고통과 아픔은 언제나 피할 수 없는 몫이지.",src:"죄와 벌 — 3부 5장"},{c:"alyo",line:"나는 당신께 절한 것이 아니에요. 인류의 모든 고통 앞에 절한 거예요.",src:"죄와 벌 — 소냐 발치의 라스콜니코프"},{c:"greg",line:"아무도 몰라줘도 저는 제 자리에서 견뎌요. 그게 제가 할 수 있는 전부니까요.",src:"변신 — 소외 속 인내"},{c:"valj",line:"다이아몬드는 땅의 어둠 속에서만 나오고, 진리는 마음의 어둠 속에서만 발견되는 법이다.",src:"레미제라블 — 발장의 성찰"},{c:"heath",line:"내 가장 큰 고통이 곧 그녀였고, 그녀가 곧 내 영혼이었어. 고통마저 내 일부였지.",src:"폭풍의 언덕 — 캐서린을 향한 집착"},{c:"haml",line:"이 모진 운명의 화살을 견딜 것인가, 맞설 것인가. 고통은 늘 나를 이리 시험하는구나.",src:"햄릿 — 3막 1장"},{c:"doro",line:"폭풍은 무서웠지만, 그게 절 새로운 땅으로 데려다줬어요. 고통 속에도 길이 있더라고요.",src:"오즈의 마법사 — 회오리바람"},{c:"jane",line:"삶은 원한을 품거나 잘못을 헤아리기엔 너무 짧다. 나는 고통을 오래 쥐고 있지 않는다.",src:"제인 에어 — 헬렌 번스와의 대화"},{c:"ishm",line:"고래를 좇는 항해처럼, 고통도 그저 받아들이고 나아갈 뿐. 바다는 늘 그러하니까.",src:"모비 딕 — 항해의 운명"},{c:"anna",line:"아픈 사랑이라도 난 후회 안 해. 고통조차 내가 살아 있었다는 증거인걸.",src:"안나 카레니나 — 사랑의 대가"}] },
  { no:"LANTERN 04", topic:"선택", vow:"나는 늘 안전만 고수하며 살아왔다. 그러나 선택에는 책임이 따르고, 그 무게를 감당할 각오가 곧 어른의 시작임을 이젠 안다. 머리로만 재지 않고 양심과 마음이 함께 옳다 하는 길을, 두렵더라도 택하기로 했다. 그것이 성장의 밑걸음이 될테니까.", status:"삶은 늘 갈래 길을 마주하게 한다. 그중 선택의 기준을 어디에 두어야 하는가? 형체가 일렁였다.", q:"선택의 기준점",
    opts:[{c:"haml",line:"사느냐 죽느냐, 그것이 문제로다. 선택이 이리 무거우니 어찌 함부로 고르겠는가.",src:"햄릿 — 3막 1장"},{c:"valj",line:"내 앞에 두 갈래 길이 똑같이 곧게 뻗어 있었다. 둘이라는 것, 그것이 사람을 두렵게 하는 법이다.",src:"레미제라블 — 발장의 양심의 폭풍"},{c:"liza",line:"첫인상만으로 사람을 단정하지 않으려 해요. 오만도 편견도, 결국 내 눈을 가리니까요.",src:"오만과 편견 — 편견의 주제"},{c:"rask",line:"선택엔 책임이 따르지. 그 무게를 감당할 각오가 있느냐부터 스스로 물어야 해.",src:"죄와 벌 — 범행의 결과"},{c:"doro",line:"잘 모르겠으면 돌아갈 곳을 떠올려요. 집으로 향하는 길이 보통은 옳거든요.",src:"오즈의 마법사 — 귀향 본능"},{c:"jane",line:"법과 원칙은 유혹이 없을 때가 아니라, 몸과 영혼이 들고일어나는 바로 이런 순간을 위한 것이다.",src:"제인 에어 — 27장"},{c:"anna",line:"안전한 쪽 말고 내 마음이 진짜 원하는 쪽. 난 나를 속이진 않잖아.",src:"안나 카레니나 — 욕망의 선택"},{c:"quix",line:"머리로 재지 말게나! 가슴이 옳다 외치거든, 자네, 그쪽이 곧 우리가 갈 길일세!",src:"돈키호테 — 기사도의 신념"},{c:"gats",line:"과거는 되돌릴 수 있다고 믿었네. 그 한 길만을 나는 끝까지 택했지.",src:"위대한 개츠비 — 과거 재현의 욕망"},{c:"greg",line:"제 편함보다 가족에게 무엇이 나은가, 제 선택의 기준은 늘 그쪽이었어요.",src:"변신 — 가족 우선"}] },
  { no:"LANTERN 05", topic:"관계", vow:"가까운 사이일수록 나는 말을 아끼고 거리를 두곤 했다. 길들인다는 건 서로에게 단 하나가 되는 일. 그 책임을 피하지 않기로 했다. 미워하기 전에 한 번 더 안아 보는 사람, 함께 걷는 사람이 되기로 다시 다짐한다.", status:"때가 오면 누군가 곁에 왔다가, 누군가 떠난다. 사람과 사람 사이를 어떻게 대해야 하는가?", q:"관계란 무엇일까?",
    opts:[{c:"heath",line:"그가 곧 나야. 우리 영혼이 무엇으로 빚어졌든, 그와 내 것은 똑같아.",src:"폭풍의 언덕 — 9장 'I am Heathcliff'"},{c:"anna",line:"사랑은 계산이 아니야. 마음이 가면 가는 거고, 그게 나라는 사람인걸.",src:"안나 카레니나 — 사랑의 본성"},{c:"alyo",line:"미워하기 전에 한 번 더 안아 보세요. 사람은 사랑으로 변하니까요.",src:"카라마조프가의 형제들 — 사랑의 실천"},{c:"valj",line:"오직 다른 사람을 사랑하는 것만이, 하느님의 얼굴을 보는 것이다.",src:"뮤지컬 레미제라블 — 가사(원작 정신)"},{c:"jane",line:"지금 나는 관습이나 격식이 아니라, 내 영혼으로 당신의 영혼에게 말하고 있는 것이다.",src:"제인 에어 — 로체스터에게"},{c:"quix",line:"벗이란 함께 모험을 떠나는 자라네! 자, 당신도 나와 함께 이 길을 걷지 않겠는가!",src:"돈키호테 — 산초와의 동행"},{c:"doro",line:"길에서 만난 친구들이 절 집까지 데려다줬어요. 관계란 함께 걷는 거더라고요.",src:"오즈의 마법사 — 동행자들"},{c:"haml",line:"누가 진정 내 편인가. 그 물음을 끝없이 되뇌었으니, 관계란 이리도 어려운 것인가.",src:"햄릿 — 로젠크란츠·길든스턴"},{c:"liza",line:"가까운 사이일수록 솔직함이 필요해요. 오해란 대개 말하지 않은 데서 시작되거든요.",src:"오만과 편견 — 다아시와의 오해"},{c:"rask",line:"나를 끝내 버리지 않은 한 사람. 그 사랑이 결국 나를 일으켜 세우더군.",src:"죄와 벌 — 소냐의 헌신"}] },
  { no:"LANTERN 06", topic:"말과 침묵", vow:"나는 해야 할 말을 삼키고, 하지 않아도 될 말을 흘리곤 했다. 따뜻한 한마디가 사람을 살린다는 걸 잊음 안된다. 진실은 끝내 떠오르니, 꾸미지 말고 정직하게 말하되 침묵해야 할 때를 분별해야 한다는 것을 누누히 기억하자.", status:"입을 열어야 할 때와 닫아야 할 때가 있는 법. 말은 어떻게 다뤄야 하는가.", q:"입을 움직여야 할 때",
    opts:[{c:"haml",line:"말, 말, 말뿐인 세상이로다. 이러니 어찌 침묵을 더 믿지 않겠는가.",src:"햄릿 — 2막 2장 'Words, words, words'"},{c:"liza",line:"진실은 늘이고 줄일 순 있어도 끝내 부러지진 않아요. 기름이 물 위에 떠오르듯 드러나거든요.",src:"오만과 편견 — 진실 주제"},{c:"jane",line:"내가 가난하고 보잘것없다 하여 영혼도 마음도 없는 줄 아는가. 그 생각은 틀렸다.",src:"제인 에어 — 23장"},{c:"alyo",line:"따뜻한 말 한마디가 사람을 살려요. 저는 그 말을 아끼지 않아요.",src:"카라마조프가의 형제들 — 선의의 말"},{c:"rask",line:"말로 자신을 속일 순 없지. 진실이란 결국 입 밖으로 새어 나오기 마련이더군.",src:"죄와 벌 — 자백의 충동"},{c:"quix",line:"한번 뱉은 약속은 목숨처럼 지키세나! 기사란 제 말에 책임을 지는 법이니!",src:"돈키호테 — 2권 진실·약속"},{c:"valj",line:"말하면 단죄받고 침묵하면 저주받는다. 그래도 사람을 말하게 하는 것 — 그것이 양심이다.",src:"레미제라블 — 샹마티외 사건의 독백"},{c:"doro",line:"고맙다는 말, 미안하다는 말은 미루지 말아요. 때를 놓치면 못 하게 되거든요.",src:"오즈의 마법사 — 이별의 인사"},{c:"anna",line:"하고 싶은 말을 삼키며 살았어. 그 침묵이 결국 날 무너뜨렸잖아.",src:"안나 카레니나 — 억눌린 진심"},{c:"greg",line:"목소리를 잃고 나서야 알았다. 평범한 한마디가 얼마나 귀한 거였는지.",src:"변신 — 말을 잃은 그레고르"}] },
  { no:"LANTERN 07", topic:"시간과 때", vow:"늦은 건 아닐까 늘 조급했던 나에게 말한다. 길을 나선 그 순간이 가장 이른 때라고. 잃은 시간을 후회하기보다 남은 시간으로 갚기로. 지금 곁에 있는 사람에게 시간을 쓰는 것, 그것이 가장 옳은 씀씀이임을 새겨보자.", status:"이미 늦은 건 아닐까, 너무 이른 건 아닐까. 시간은 언제나 예측하지 못한다. 흘러가는 시간을 어떻게 마주하는가.", q:"시간에 대한 답변",
    opts:[{c:"gats",line:"그렇게 우리는 끝없이 과거로 떠밀리면서도, 물살을 거슬러 배를 저어 나아가는 것이라네.",src:"위대한 개츠비 — 9장 마지막 문장"},{c:"haml",line:"때가 어긋난 세상에 태어났구나. 허나 그 어긋난 때를 바로잡는 것 또한 내 몫인가.",src:"햄릿 — 1막 5장 'time is out of joint'"},{c:"doro",line:"돌아갈 때를 아는 게 중요해요. 모험에도 끝맺을 시간이 있는 거니까요.",src:"오즈의 마법사 — 귀향의 때"},{c:"quix",line:"늦은 때란 없네! 자네가 길을 나선 그 순간이, 곧 가장 이른 때가 아니겠는가!",src:"돈키호테 — 만년의 출정"},{c:"greg",line:"매일 같은 시간에 일어나 제 일을 했어요. 그 성실함이 제 시간을 지탱했죠.",src:"변신 — 반복되던 일상"},{c:"rask",line:"잃어버린 시간은 돌아오지 않지. 허나 남은 시간으로 속죄할 순 있더군.",src:"죄와 벌 — 에필로그의 갱생"},{c:"ishm",line:"바다는 서두르는 법이 없네. 거대한 흐름 앞에서 인간의 조급함이란 부질없는 것이지.",src:"모비 딕 — 바다와 운명"},{c:"anna",line:"늦은 걸 알면서도 난 멈추지 못했어. 시간은 마음을 기다려 주지 않잖아.",src:"안나 카레니나 — 돌이킬 수 없는 선택"},{c:"valj",line:"한 방울 물이 바위를 뚫듯, 시간은 사람의 성품마저 천천히 바꾸어 놓는 법이다.",src:"레미제라블 — 성품의 변화"},{c:"alyo",line:"지금 곁에 있는 사람에게 시간을 쓰세요. 사랑할 시간은 언제나 지금뿐이에요.",src:"카라마조프가의 형제들 — 현재의 사랑"}] },
  { no:"LANTERN 08", topic:"약함과 강함", vow:"나는 내 약함을 부끄러워했다. 그러나 약함을 인정하는 데서 진짜 강함이 시작된다는 걸 배운다. 낮은 자리에서 사랑하는 것, 보이지 않는 곳에서 한 걸음씩 버티는 것 — 그 조용한 용기를 나의 힘으로 삼기로 했다.", status:"누구나 내 안의 나약함을 부끄러워한다. 당신에게 진짜 강함이란 무엇인가.", q:"강함에 대한 답변",
    opts:[{c:"jane",line:"나는 가난하고 작지만, 그래서 더욱 나를 존중한다. 그것이 내가 가진 힘이다.",src:"제인 에어 — 자존의 선언"},{c:"valj",line:"보이지 않는 곳에서 한 걸음씩 버티는 용기 — 그 이름 없는 영웅됨이야말로 가장 큰 힘이다.",src:"레미제라블 — '보이지 않는 용기'"},{c:"greg",line:"약해도 묵묵히 버티는 사람이 있어요. 그게 저예요.",src:"변신 — 견딤의 자세"},{c:"quix",line:"비웃음 앞에서도 창을 드세나! 두려움을 이기는 것, 그것이야말로 우리의 힘일세!",src:"돈키호테 — 풍차의 돌격"},{c:"rask",line:"제 약함을 인정하는 데서 진짜 강함이 시작되지. 나는 그걸 너무 늦게 알았더군.",src:"죄와 벌 — 자기기만의 붕괴"},{c:"heath",line:"꺾이느니 차라리 불타겠어. 내 격정은 약함이 아니라, 누구도 못 막는 힘이지.",src:"폭풍의 언덕 — 히스클리프의 격정"},{c:"haml",line:"칼보다 무서운 건 끝까지 묻는 정신이로다. 나약해 보여도 그것이 내 무기였거늘.",src:"햄릿 — 사유하는 자의 힘"},{c:"doro",line:"겁쟁이 사자도 결국 용기를 냈어요. 강함이란 타고나는 게 아니라 내는 거더라고요.",src:"오즈의 마법사 — 겁쟁이 사자"},{c:"liza",line:"내 판단이 틀렸음을 인정하는 것 — 그 용기야말로 진짜 강함이 아닐까요.",src:"오만과 편견 — 자기 인식"},{c:"anna",line:"세상이 다 등 돌려도 난 내 마음을 따랐는걸. 그 고집도 일종의 강함이었을까.",src:"안나 카레니나 — 사회에의 저항"}] },
  { no:"LANTERN 09", topic:"나다움", vow:"세상은 자꾸 나를 다른 모습으로 만들려 한다. 나는 천사도, 남이 정한 잣대도 아니다. 그저 나로 살기로 한다. 화려함이 아니라 꾸미지 않은 진심으로, 끝까지 나로 남는 것, 그것이 나의 나다움이다.", status:"세상은 자꾸 나를 다른 모습으로 만들려 한다. 흔히들 페르소나라고도 한다. 그렇다면 나는 어떻게 나로서 있는가.", q:"나답게 산다는 것",
    opts:[{c:"jane",line:"나는 천사가 아니다. 죽을 때까지 천사가 되지도 않을 것이다. 나는 그저 나로 살겠다.",src:"제인 에어 — 24장"},{c:"anna",line:"내 감정을 부정하진 않아. 손가락질받아도, 그게 나인걸.",src:"안나 카레니나 — 자아에의 충실"},{c:"quix",line:"세상이 나를 미치광이라 부르든 어떤가! 나와 함께, 우리의 이상에 충실한 기사로 남세!",src:"돈키호테 — 자기 신념"},{c:"heath",line:"나는 길들지 않아. 내 영혼은 저 황야처럼, 누구의 틀에도 갇히지 않지.",src:"폭풍의 언덕 — 황야의 영혼"},{c:"haml",line:"나로 살 것인가, 세상에 맞출 것인가. 그 물음을 멈추지 않는 것이 곧 나다움인가.",src:"햄릿 — 자기 정체성의 번민"},{c:"liza",line:"남이 정한 잣대에 나를 맞추지 않아요. 내 생각과 취향이, 곧 나라는 사람이거든요.",src:"오만과 편견 — 엘리자베스의 독립성"},{c:"rask",line:"나는 한참을 헤맨 뒤에야 진짜 나를 만났지. 가면을 벗는 게 곧 나다움이더군.",src:"죄와 벌 — 갱생의 자각"},{c:"doro",line:"화려한 오즈보다 낡은 우리 집이 좋아요. 나답다는 건 거창한 게 아니더라고요.",src:"오즈의 마법사 — 'no place like home'"},{c:"alyo",line:"꾸미지 않은 진심, 그게 저예요. 낮은 자리도 부끄럽지 않아요.",src:"카라마조프가의 형제들 — 겸손한 자아"},{c:"greg",line:"아무도 알아주지 않아도 저는 제 도리를 지켰어요. 그게 변하지 않는 저였죠.",src:"변신 — 끝까지 지킨 책임"}] },
  { no:"LANTERN 10", topic:"유산", vow:"삶이란 여정의 끝에서 고민해 봤다. 나는 무엇을 남기고 갈까. 거창한 업적이 아니라, 한 사람의 마음에 남긴 작은 선의라고 생각했다. 무너졌다 다시 일어서고, 사랑하는 사람에게 최선을 다했던 그 나날들. 그거면 충분하다고, 마지막 지문 앞에서 이곳에 세겨본다.", status:"마지막 등불이다. 여정의 끝까지 온 당신에게 물어본다. 나는 무엇을 남기고 싶은가.", q:"남길 무언가에 관하여",
    opts:[{c:"valj",line:"누군가를 사랑했다는 것, 한 사람 안에서 하느님의 얼굴을 보았다는 것 — 그거면 충분한 법이다.",src:"레미제라블 — 발장의 임종"},{c:"quix",line:"닿을 수 없는 별을 좇았다는 이야기! 자네, 그 한 줄을 함께 남기지 않겠는가!",src:"돈키호테 — 이상의 추구"},{c:"haml",line:"내 이야기를 부디 제대로 전해다오. 끝내 남는 건 누군가 기억해 줄 이야기뿐이니.",src:"햄릿 — 5막 2장 호레이쇼에게"},{c:"jane",line:"내가 사랑하는 것과 온전히 더불어 살았다는 것. 그 충만함을 남기고 싶다.",src:"제인 에어 — 결말의 고백"},{c:"rask",line:"무너졌다가 다시 일어섰다는 것. 그 회복의 자국을 남기고 싶군.",src:"죄와 벌 — 에필로그"},{c:"gats",line:"끝내 닿지 못해도 그 불빛을 포기하지 않았다는 것. 그 순정을 남기고 가네.",src:"위대한 개츠비 — 초록 불빛의 동경"},{c:"doro",line:"집으로 무사히 돌아왔다는 것. 그 평범한 한마디를 남기고 싶어요.",src:"오즈의 마법사 — 귀향"},{c:"alyo",line:"한 사람의 마음에 남긴 작은 선의. 저는 그거면 충분해요.",src:"카라마조프가의 형제들 — 선행의 기억"},{c:"heath",line:"한 영혼을 죽도록 사랑했다는 것. 그 격정의 자취를 남기고 가지.",src:"폭풍의 언덕 — 불멸의 사랑"},{c:"ishm",line:"거대한 운명을 마주하고도 살아남아 이야기를 전한다는 것. 그거면 됐네.",src:"모비 딕 — 유일한 생존자 이슈메일"}] }
];

/* =========================================================================
   상태 & 로직
   ========================================================================= */
const app   = document.getElementById("app");
const hint  = document.getElementById("hint");

const state = { phase:"title", curL:0, sel:0, saved:false, tally:{}, shown:{} };

/* 보기 무작위 N개 (등불별로 한 번 정해지면 유지) */
function shuffle(a){ const x=a.slice(); for(let i=x.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [x[i],x[j]]=[x[j],x[i]]; } return x; }
function shownFor(idx){
  if(!state.shown[idx]) state.shown[idx] = shuffle(LANTERNS[idx].opts).slice(0, PICK);
  return state.shown[idx];
}

/* 가장 많이 고른 캐릭터 */
function bestChar(){
  let best=null, bn=-1;
  for(const k in CHARS){ const n=state.tally[k]||0; if(n>bn){ bn=n; best=k; } }
  return best;
}

/* 작은 DOM 헬퍼 */
function el(tag, cls, text){
  const n=document.createElement(tag);
  if(cls) n.className=cls;
  if(text!=null) n.textContent=text;
  return n;
}

/* =========================================================================
   화면 렌더
   ========================================================================= */
function render(){
  app.innerHTML="";
  if(state.phase==="title")       renderTitle();
  else if(state.phase==="intro")   renderIntro();
  else if(state.phase==="lantern") renderLantern();
  else if(state.phase==="result")  renderResult();
  else if(state.phase==="outro")   renderOutro();
}

function renderTitle(){
  const s = el("div","screen");
  const img = el("img","lantern-img"); img.src="assets/lantern.jpg"; img.alt="등불";
  const h1 = el("h1","title-h1","등불 일지");
  const sub = el("div","title-sub","UNTIL THE NEXT LIGHT  ·  등불 일지  ·  12B 이소현 [Katy]");
  const start = el("div","title-start","> 등불을 켠다 (Enter)");
  start.addEventListener("click", confirm);
  const epi = el("div","title-epi");
  epi.innerHTML = '"주의 말씀은 내 발에 등이요 내 길에 빛이니이다"<br>— 시편 119:105';
  s.append(img,h1,sub,start,epi);
  app.append(s);
  hint.textContent = "Enter — 등불을 켠다";
}

/* ==================================================
   서문 / 후문 텍스트 — 여기 내용만 고치면 화면이 바뀜
   ================================================== */
const INTRO = {
  title: "서문 — 동굴로 들어가기 전에",
  // **굵게** 로 감싼 부분은 GraceSerif Bold로 강조됨
  body: [
    "여기, **빛 한 점 없는 동굴**이 있다. 길은 보이지 않고, 발끝조차 가늠할 수 없다.",
    "동굴이란 일생 속에 살다보면 갖가지 위협이 오곤 한다. \"꿈, 불안과 평안, 고통, 선택, 관계, 말과 침묵, 시간과 때, 약함과 강함, 나다움, 그리고 유산"\. 모든 시련들은 언젠가 우릴 무릅꿇릴 것이다.",
    "앞으로 당신은 **10개의 등불을** 지날 것이다. 각 등불 앞에서 **10가지 질문**이 던져지고, 어둠 속 고전의 형체들이 저마다의 답을 할것이다.",
    "마음이 머무는 답을 고르라. 옳고 그름은 없다. 다만 **당신이 어떤 목소리에 가장 오래 귀 기울이는가**가 길 끝에서 자신만의 등불을 찾게 할 것이다.",
    "이제, 첫 번째 등불로 나아가자."
  ],
  enter: "▸ 빛을 따라 들어선다 (Enter)"
};

const OUTRO = {
  title: "후문 — 여정의 끝을 알리며",
  // 한 줄씩 타자체로 천천히 떠오름. **굵게** 강조 가능.
  body: [
    "이 잠언집을 만들며, 나는 수많은 명문들이 내 앞에 오래 머물렀다.",
    "고전 속 인물들의 말은 **수백 년 전의 것**인데도, 지금의 나에게 그대로 와닿았다.",
    "도스토옙스키의 회복, 위고의 양심, 제인 에어의 자존 등, 그 목소리들이 삶의 고민 앞에서 내 등불이자 답이 되어 주었다.",
    "성경이 \"주의 말씀은 내 발의 등불\"이라 말하듯, **빛은 멀리서 한꺼번에 오지 않았다.**",
    "다만 다음 한 걸음을 비출 만큼, 등불에서 등불로 이어질 만큼 주어졌다. 앞으로 수많은 난관이 드리울 것이다",
    "하지만 나에겐 이제 **용기**와 **말씀**이 함께 하신다. 그리고 무엇보다 이 문장들을 선물로 주신 **하나님께서** 함께 하신다.",
    "그거면 충분했다. **다음 등불까지** 걸어갈 수 있다면, 나는 성실히 살아갈 것이니까."
  ],
  enter: "▸ 처음으로 돌아간다 (Enter)"
};

/* 타이틀 → 배경이 서서히 사라지는 고스트 페이드 후 서문 진입 */
function ghostToIntro(){
  document.body.classList.add("ghost-out");   // CSS가 배경 레이어를 페이드아웃
  hint.textContent = "";
  const cur = app.querySelector(".screen");
  if(cur){ cur.style.transition="opacity 1.1s ease"; cur.style.opacity="0"; }
  setTimeout(()=>{
    state.phase="intro"; render();
    document.body.classList.remove("ghost-out");
  }, 1200);
}

/* 서문 — 위/아래 장식이 펼쳐지고 그 사이에 글 */
function renderIntro(){
  const wrap = el("div","gate-wrap");
  const top = el("img","gate-orn gate-top"); top.src="assets/ornament_top.png";
  const bot = el("img","gate-orn gate-bot"); bot.src="assets/ornament_bot.png";
  const panel = el("div","gate-panel");
  panel.append(el("div","gate-title", INTRO.title));
  INTRO.body.forEach(p=>{
    const line = el("div","gate-line");
    line.innerHTML = mdBold(p);
    panel.append(line);
  });
  const go = el("div","gate-enter", INTRO.enter);
  go.addEventListener("click", confirm);
  panel.append(go);
  wrap.append(top, panel, bot);
  app.append(wrap);
  // 펼침 애니메이션 트리거
  requestAnimationFrame(()=> wrap.classList.add("open"));
  hint.textContent = "Enter — 검사를 시작한다";
}

/* 후문 — 장식이 다시 펼쳐지고, 느낀 점을 한 줄씩 타자체로 */
function renderOutro(){
  const wrap = el("div","gate-wrap");
  const top = el("img","gate-orn gate-top"); top.src="assets/ornament_top.png";
  const bot = el("img","gate-orn gate-bot"); bot.src="assets/ornament_bot.png";
  const panel = el("div","gate-panel");
  panel.append(el("div","gate-title", OUTRO.title));
  const go = el("div","gate-enter outro-enter", OUTRO.enter);
  go.style.opacity="0";
  wrap.append(top, panel, bot);
  app.append(wrap);
  requestAnimationFrame(()=> wrap.classList.add("open"));
  hint.textContent = "";

  // 장식이 펼쳐진 뒤(700ms) 한 줄씩 타자체로 출력
  let li=0;
  function nextLine(){
    if(li>=OUTRO.body.length){
      go.style.transition="opacity 1s ease"; go.style.opacity="1";
      panel.append(go);
      go.addEventListener("click", confirm);
      hint.textContent = "Enter — 처음으로";
      return;
    }
    const line = el("div","gate-line typing");
    panel.append(line);
    typeInto(line, OUTRO.body[li], ()=>{ li++; setTimeout(nextLine, 300); });
  }
  setTimeout(nextLine, 750);
}

/* **굵게** → <b>굵게</b> */
function mdBold(s){
  return s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
          .replace(/"(.*?)"/g, '<span class="quote">"$1"</span>');
}

/* 한 글자씩 타이핑 (굵게 마크업 보존) */
function typeInto(node, raw, done){
  // **..** 강조를 토큰으로 분해해서 글자 단위 출력
  const tokens=[];
  raw.replace(/\*\*(.+?)\*\*|("(.*?)")|([^*"]+)/g,(m,b,q,qi,plain)=>{
    if(b!=null) for(const ch of b) tokens.push({ch,bold:true});
    else if(q!=null) for(const ch of q) tokens.push({ch,quote:true});
    else for(const ch of plain) tokens.push({ch});
    return m;
  });
  let k=0;
  const timer=setInterval(()=>{
    if(k>=tokens.length){ clearInterval(timer); done&&done(); return; }
    const t=tokens[k++];
    const sp=document.createElement(t.bold?"b":"span");
    if(t.quote) sp.className="quote";
    sp.textContent=t.ch;
    node.append(sp);
  }, 28);
}

function renderLantern(){
  const L = LANTERNS[state.curL];
  const opts = shownFor(state.curL);
  const s = el("div","screen lantern-screen");

  const head = el("div","lantern-head");
  head.append(el("span","flame"), el("span","lantern-no",L.no), el("span","lantern-topic","「"+L.topic+"」"));

  const status = el("div","lantern-status","STATUS · "+L.status);
  const q = el("div","lantern-q","◆ "+L.q);

  const choices = el("div","choices");
  opts.forEach((o,i)=>{
    const sel = i===state.sel;
    const card = el("div", "choice"+(sel?" sel":""));
    card.append(el("span","heart","●"));
    card.append(el("span","line",'"'+o.line+'"'));
    card.append(el("span","src","— "+o.src));
    card.addEventListener("click", ()=> pickChoice(i));
    choices.append(card);
  });

  const save = el("div","save-note"+(state.saved?" on":""), state.saved ? "▸ 기록됨. Enter — 다음 등불로 →" : "· 답을 고르고 Enter 로 기록한다");

  // 답을 기록하면 이 소주제에 대한 '나의 다짐'이 펼쳐진다
  s.append(head,status,q,choices);
  if(state.saved && L.vow){
    const vow = el("div","lantern-vow");
    vow.append(el("div","vow-label","✦ 이 등불 앞에서 — 나의 다짐"));
    vow.append(el("div","vow-body",L.vow));
    s.append(vow);
  }
  s.append(save);
  const pips = el("div","pips");
  LANTERNS.forEach((_,i)=>{
    let c="pip";
    if(i<state.curL) c+=" done";
    if(i===state.curL) c+=" cur";
    pips.append(el("div",c));
  });
  pips.append(el("span","progress",(state.curL+1)+" / "+LANTERNS.length));

  s.append(pips);
  app.append(s);
  hint.textContent = "↑↓←→ / WASD 이동 · Enter " + (state.saved ? "기록하고 다음 등불로" : "기록");
}

function renderResult(){
  const ch = CHARS[bestChar()];
  const wrap = el("div","result-wrap");
  const scroll = el("div","scroll");
  const inner = el("div","scroll-inner");
  const lead = el("div","r-lead"); lead.innerHTML = "열 개의 등불을 지나,<br>당신 곁에 가장 오래 머문 목소리";
  inner.append(lead);
  inner.append(el("div","r-name",ch.name));
  inner.append(el("div","r-alias",ch.alias));
  inner.append(el("div","r-work",ch.work));
  inner.append(el("div","r-desc",ch.desc));
  scroll.append(inner);

  const again = el("div","r-again","다음 길로 →");
  again.addEventListener("click", ()=>{ state.phase="outro"; render(); });

  wrap.append(scroll, again);
  app.append(wrap);
  hint.textContent = "Enter — 다음 길로";
}

/* =========================================================================
   상호작용
   ========================================================================= */
function moveSel(d){
  if(state.phase!=="lantern") return;
  const n = shownFor(state.curL).length;
  state.sel = (state.sel + d + n) % n;
  state.saved = false;
  updateSelection();   // 전체 재렌더 대신 선택 부분만 갱신 → 깜빡임 없음
  rippleOnSel();
}
function pickChoice(i){
  if(state.phase!=="lantern") return;
  state.sel = i; state.saved = false;
  updateSelection();
  rippleOnSel();
}
/* 선택지 강조/안내문/다짐만 제자리에서 갱신 (화면 깜빡임 방지) */
function updateSelection(){
  document.querySelectorAll(".choice").forEach((c,i)=> c.classList.toggle("sel", i===state.sel));
  const save = document.querySelector(".save-note");
  if(save){
    save.textContent = state.saved ? "▸ 기록됨. Enter — 다음 등불로 →" : "· 답을 고르고 Enter 로 기록한다";
    save.classList.toggle("on", state.saved);
  }
  // 기록되면 이 소주제의 '나의 다짐'을 펼치고, 해제되면 거둔다 (전체 리렌더 없이)
  const L = LANTERNS[state.curL];
  const existing = document.querySelector(".lantern-vow");
  if(state.saved && L && L.vow){
    if(!existing && save){
      const vow = el("div","lantern-vow");
      vow.append(el("div","vow-label","✦ 이 등불 앞에서 — 나의 다짐"));
      vow.append(el("div","vow-body",L.vow));
      save.parentNode.insertBefore(vow, save);
    }
  } else if(existing){
    existing.remove();
  }
  hint.textContent = "↑↓←→ / WASD 이동 · Enter " + (state.saved ? "기록하고 다음 등불로" : "기록");
}

function confirm(){
  if(state.phase==="title"){ ghostToIntro(); return; }
  if(state.phase==="intro"){ state.phase="lantern"; state.curL=0; state.sel=0; state.saved=false; render(); return; }
  if(state.phase==="result"){ state.phase="outro"; render(); return; }
  if(state.phase==="outro"){ reset(); return; }
  if(state.phase==="lantern"){
    if(!state.saved){ state.saved=true; updateSelection(); }
    else {
      const cid = shownFor(state.curL)[state.sel].c;
      state.tally[cid] = (state.tally[cid]||0) + 1;
      if(state.curL < LANTERNS.length-1){ state.curL++; state.sel=0; state.saved=false; render(); }
      else { state.phase="result"; render(); }
    }
  }
}
function reset(){
  state.phase="title"; state.curL=0; state.sel=0; state.saved=false; state.tally={}; state.shown={};
  render();
}

/* 키보드: 방향키 / WASD 이동, Enter·Space 확정 */
document.addEventListener("keydown", e=>{
  const k = e.key.toLowerCase();
  if(["arrowup","w","arrowleft","a"].includes(k)){ e.preventDefault(); moveSel(-1); }
  else if(["arrowdown","s","arrowright","d"].includes(k)){ e.preventDefault(); moveSel(1); }
  else if(k==="enter"||k===" "){ e.preventDefault(); confirm(); }
});

/* =========================================================================
   클릭 파장 (새로고침 없이 선택지/화면에서 퍼짐)
   ========================================================================= */
function spawnRipple(x,y,big){
  const r = document.createElement("div");
  r.className = "ripple";
  const size = big ? 250 : 150;
  r.style.left = x+"px"; r.style.top = y+"px";
  r.style.width = size+"px"; r.style.height = size+"px";
  document.body.append(r);
  setTimeout(()=> r.remove(), 720);
}
document.addEventListener("pointerdown", e=> spawnRipple(e.clientX, e.clientY, false));
function rippleOnSel(){
  requestAnimationFrame(()=>{
    const elx = document.querySelector(".choice.sel");
    if(elx){ const r = elx.getBoundingClientRect(); spawnRipple(r.left+26, r.top+r.height/2, true); }
  });
}

/* 시작 */
render();
