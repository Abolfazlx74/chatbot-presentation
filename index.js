const firstPage = document.querySelector(".first-page");
const body = document.querySelector("body")
function closeFirstPage(){
    console.log(firstPage);
    firstPage.style.top = `-${window.innerHeight}px`;
    document.removeEventListener("mousemove", drawingSnow); 
    // body.style.cursor = "auto"
    firstPage.style.disply = 'none'
    firstPage.addEventListener("transitionend",()=>{
        firstPage.style.display = 'none'
        addBotMessage(`خوش آمدید!
        <br>می‌توانید درباره موضوعات زیر با من صحبت کنید.
        <br>1: چت بات چیست و چه کاربردی دارد؟
        <br>2: چت بات چه اجزایی دارد؟
        <br>3: چگونه کار میکند؟
        <br>4: تاریخچه چت بات 
        <br>5: مزایا و معایب استفاده از چت بات
        <br>6: نحوه پیاده‌سازی چت بات`,10);
    })
}

const continuePart = document.querySelector(".continue-button")

function drawingSnow(event){
        let x = event.clientX;
        let y = event.clientY;
        let circle = document.createElement("div");
        circle.classList.add("snowflake");
        circle.style.transition ="800ms"
        circle.style.position = "absolute";
        circle.style.opacity = ".8";
        circle.style.zIndex = -1
        circle.style.left = x + "px";
        circle.style.top = y + "px";
        circle.style.width = "12px";
        circle.style.height = "10px";
        circle.style.borderRadius = "50%";
        circle.style.backgroundColor = "rgb(165, 165, 165)";

        document.body.appendChild(circle);
        setTimeout(() => {
            circle.style.width = 0
            circle.addEventListener("transitionend",()=>{
                document.body.removeChild(circle);
            })
        }, 10);

}

const drawSnow = () => document.addEventListener("mousemove", drawingSnow);
drawSnow();


const botImageContainer = document.querySelector(".show-bot-image-part")
const botImage = document.getElementById("bot-image")
let scrolled = false;
const orbitImages = document.querySelector(".orbit-images")  
const orbit = document.querySelector(".draw-circle")
const secondImageContainer = document.querySelector(".bot-sec-image-container")
function handleTransitionEnd(){
    botImageContainer.style.transition = "500ms"
    // secondImageContainer.style.height = "16rem"
}
document.addEventListener("wheel", () => {
    // if (!scrolled) {
        var y = event.deltaY;
        if(y>0){
            botImageContainer.removeEventListener("transitionend", handleTransitionEnd);
            botImageContainer.style.width = "30rem";
            botImageContainer.style.height = "9rem";
            
            scrolled = true;
            orbitImages.style.opacity = "1"
            orbit.style.display=  "block"
            botImage.style.height = "16rem"
            
            botImageContainer.addEventListener("transitionend",()=>{
                botImageContainer.style.transition = "800ms"
            })
        }
        if(y<0){

            // })
            botImageContainer.style.width = "40rem";
            botImageContainer.style.height = "20rem";
            
            scrolled = true;
            orbitImages.style.opacity = "0"
            orbit.style.display=  "none"
            botImage.style.height = "22rem"
            botImageContainer.addEventListener("transitionend",handleTransitionEnd)
        }
    // }
    
});
// chatPart start



const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const chatPart = document.querySelector(".chat-part")
function addUserMessage(message,delay = false) {
    const userMessagecontainer = document.createElement('div');
    const userMessageElement = document.createElement('div');
    const userProfile = document.createElement('img');
    userProfile.classList.add("user-profile")
    userMessagecontainer.classList.add("user-message-container")
    userProfile.src = "user.svg"
    userMessageElement.classList.add('user-message');
    chatMessages.appendChild(userMessagecontainer);
    userMessagecontainer.appendChild(userProfile);
    userMessagecontainer.appendChild(userMessageElement);
    if(delay){typeMessage(userMessageElement, message,10);}
    else{userMessageElement.textContent = message;}
}

function addBotMessage(message,delayValue=0,specialClassName=false) {
    const botMessagecontainer = document.createElement('div');
    const botMessageElement = document.createElement('div');
    const botProfile = document.createElement('img');
    if(specialClassName){
        botMessagecontainer.classList.add(specialClassName);    
    }
    botMessageElement.classList.add('bot-message');
    botProfile.classList.add("bot-profile")
    botMessagecontainer.classList.add("bot-message-container")
    botProfile.src = "bot.svg"
    botMessageElement.classList.add('bot-message');
    chatMessages.appendChild(botMessagecontainer);
    botMessagecontainer.appendChild(botProfile);
    botMessagecontainer.appendChild(botMessageElement);
    typeMessage(botMessageElement, message,delayValue);
}

function effectsMessageHandler(){
    const botMessagecontainer = document.createElement('div');
    const botMessageElement = document.createElement('div');
    const botProfile = document.createElement('img');
    botMessageElement.classList.add('bot-message');
    botProfile.classList.add("bot-profile")
    botMessagecontainer.classList.add("bot-message-container")
    botProfile.src = "bot.svg"
    botMessageElement.classList.add('bot-message');
    chatMessages.appendChild(botMessagecontainer);
    botMessagecontainer.appendChild(botProfile);
    botMessagecontainer.appendChild(botMessageElement);
    // 
    effects = document.createElement("div")
    effects.classList.add('effects')
    advantages = document.createElement("section")
    advantages.classList.add('advantages')
    disadvantages = document.createElement("section")
    disadvantages.classList.add('disadvantages')
    botMessageElement.appendChild(effects)
    effects.appendChild(advantages)
    effects.appendChild(disadvantages)
    typeMessage(advantages,`            <div><img src="chatbot-images/like.svg" alt="">مزایا و امکانات چت‌بات</div>
            <div>پاسخگویی ۲۴/۷</div>
            <div>افزایش بهره‌ وری</div>
            <div>پاسخ سریع</div>
            <div>کاهش هزینه</div>`,.2)
        typeMessage(disadvantages,`            <div><img src="chatbot-images/unlike.svg" alt=""> معایب و چالش‌های  پیاده‌سازی چت‌بات</div>
            <div>محدودیت‌های تفاوت‌سنجی</div>
            <div>پیچیدگی فنی</div>
            <div>کیفیت پاسخ</div>
            <div>حریم خصوصی و امنیت</div>`,.2)
    // typeMessage(botMessageElement, message);
}
function scrollChatPart(element){
    if(parseInt(window.getComputedStyle(element).height) <= parseInt(window.getComputedStyle(chatPart).height)){
        chatPart.scrollTop = parseInt(chatPart.scrollHeight);
    } 
}

function typeMessage(element, message,timeValue= 0) {
    let index = 0;
    let positiveValue = 1
    if(timeValue==0){
        positiveValue = 2
    }
    else if(timeValue<1){
        positiveValue = timeValue*20
        timeValue = 0
    }
    const typingInterval = setInterval(() => {
        if (index <= message.length) {
            element.innerHTML = message.slice(0, index);
            index+= positiveValue;
            scrollChatPart(element)
        } 
        else {
            clearInterval(typingInterval);
        }
        
    }, timeValue);
}

userInput.addEventListener('keypress', function(event) {
    const message = event.target.value;
    if (event.key === 'Enter' && message.trim()!=="") {
        console.log(message.trim())
        // if (message.trim() == 'چت بات چیست و چه کاربردی دارد؟') {
            // addUserMessage(message);
            // event.target.value = '';
        // }
        // else {
            addUserMessage(message);
            event.target.value = '';
            setTimeout(() => addBotMessage("سلام! چطور می‌توانم به شما کمک کنم؟"), 1000);
        // }
    }
});


const definedMessagesSet = document.querySelectorAll(".questions-part div")

definedMessagesSet.forEach(element => {
    element.addEventListener("click",()=>{
        element.style.display = "none"
        addUserMessage(element.textContent,true)
        console.log(element.id)
        // <div class="history-item">Virtual assistants</div>
        // <div class="history-item">kuki</div>
        if(element.id == "history-of-chatbots"){
            setTimeout(() =>{
                chatMessages.innerHTML += `                <div class="history-container">
                    <div class="history-item">Turing test 1966</div>
                    <div class="history-item">Eliza 1966</div>
                    <div class="history-item">Parry 1972</div>
                    <div class="history-item">Alice 1995</div>
                    <div class="history-item">Jabberwacky 2005</div>
                    <div class="history-item">kuki &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</div>
                    <div class="history-item">ChatGPT 2022</div>
                    <div class="history-item">Claude 2022</div>
                    <div class="history-item">Copilot 2023</div>                       
                    <hr class="history-time-line">
                    <div class="locator">📍</div>
                  </div>
            </div>`
            drawHistoryPart()
            // addBotMessage(`aaaaaaaaa`)
            },700)
        }
        if(element.id == "whats-chatbot"){
            setTimeout(() =>addBotMessage(`چت بات چیست؟
<br>چت‌بات یک نوع نرم‌افزار است که از هوش مصنوعی و پردازش زبان طبیعی برای برقراری تعامل با کاربران استفاده می‌کند. این سیستم‌ها می‌توانند به صورت متنی یا صوتی با کاربران ارتباط برقرار کنند و به سوالات و درخواست‌های آنها پاسخ دهند. از جمله مزیت‌های استفاده از چت‌بات، صرفه‌جویی در زمان و ارتقاء تجربه کاربری می‌باشد. با استفاده از این نرم‌افزارها، کاربران قادرند به راحتی و بدون نیاز به تعامل مستقیم با انسان‌ها، سوالات خود را مطرح کرده و نیازهایشان را برطرف کنند.
<br>بیایید فرض کنیم که شما صاحب یک فروشگاه گل هستیدو شما تنها کارمند هستید، شاید وقتی برای پاسخ به پرسش‌های متداول مشتریان، مانند ساعت بازگشایی، موجودی گل‌ها و نحوه تماس با شما، ندارید. اینگونه که مشتری شما نیاز به تماس با شما دارد، اما شما مشغول هستید و نمی‌توانید تلفن را جواب دهید. پس چه کاری می‌توانیم بکنیم تا این مشکل را حل کنیم؟ اینجاست که فلورا، چت‌بات گل، وارد می‌شود. حالا اگر یک مشتری سوال ساده‌ای داشته باشد، بگوییم او فقط می‌خواهد ساعت بازگشایی را بداند. او می‌تواند از فلورا بپرسد "خب، چه ساعتی باز میشوید؟" و فلورا قادر خواهد بود پاسخ مناسبی ارائه دهد. همه این‌ها بدون اینکه بخواهیم با چت‌بات یا مشتری تعامل داشته باشیم انجام میشود، بنابراین آزاد هستیم که کاری که دوست داریم را انجام دهیم، که یعنی طراحی ترتیب‌ گل ها.
<br><div class="halfWidthImageContainer"><img src="chatbot-images/Digital-Banking-Across-Channels-2-2.png" id="halfWidthImage" alt="">
</div>`),700)
        }
        if(element.id == "chatbot-components"){
            setTimeout(() =>addBotMessage(`یک چت‌بات شامل ساختار و اجزایی است که برای عملکرد صحیح و کارایی بالا در تعامل با کاربران طراحی می‌شود که هرکدام وظایف و مسئولیت‌های خاصی را در فرآیند تعامل با کاربر انجام می‌دهند. برخی از اجزای اصلی یک چت‌بات عبارتند از:

<br>مدل هوش مصنوعی: یک مدل هوش مصنوعی برای چت بات آموزش داده می‌شود. این مدل‌ها معمولاً بر پایه یادگیری عمیق و شبکه‌های عصبی و الگوریتم های ماشین لرنینگ ساخته می‌شوند. مدل‌ها با استفاده از مجموعه‌های داده غنی، متنوع و پوشا آموزش داده می‌شوند تا بتوانند به درستی به سوالات و درخواست‌های کاربران پاسخ دهند.

<br>پردازش زبان طبیعی (NLP): این بخش مسئول تفسیر و فهم مفاهیم و معنایی که در متن ورودی وجود دارد می‌باشد و متن خروجی را نیز تولید میکند.
<br>استخراج داده ها: استخراج داده‌ها از وب سرویس‌ها یا پایگاه‌های داده.
<br>سیستم مدیریت داده: این بخش از معماری مسئول مدیریت و نگهداری داده‌های مربوط به کاربران، پرسش‌ها و پاسخ‌های چت‌بات می‌باشد.
<br>واسط کاربری: این بخش مربوط به تعامل با کاربران است و وظیفه نمایش پرسش‌ها، پاسخ‌ها و سایر اطلاعات مرتبط را دارد، معمولاً به صورت یک رابط کاربری گرافیکی یا متنی ارائه می‌شود.
<br>این اجزا با هم تعامل می‌کنند تا یک تجربه تعاملی موثر و کارا برای کاربران فراهم کنند و به آن‌ها در حل مسائل و دریافت اطلاعات مورد نیاز کمک کنند.
`),700)
        }


        if(element.id == "how-does-it-work"){
            setTimeout(() =>addBotMessage(`چندین مرحله و فرآیند که از دریافت ورودی کاربر تا تولید خروجی مورد نیاز شامل می‌شود:
<br> 1.دریافت ورودی کاربر: در این مرحله، چت‌بات ورودی کاربر را دریافت می‌کند، که ممکن است شامل متن، صدا یا تصاویر باشد.
<br> 2. پردازش و تحلیل ورودی: سپس، ورودی کاربر توسط الگوریتم‌های پردازش زبان طبیعی (NLP) مورد تجزیه و تحلیل قرار می‌گیرد. این مرحله شامل شناسایی قصد کاربر (Intent) و موجودیت‌ها (Entity Recognition) است.
<br> 3.تصمیم‌گیری: بر اساس تفسیر ورودی، چت‌بات بر اساس الگوریتم هایش تصمیم می‌گیرد که چه پاسخی را به کاربر ارسال کند. 
<br> 4. تولید پاسخ: در این مرحله، چت‌بات پاسخ مناسب را بر اساس تصمیم‌گیری‌های اخذ شده تولید می‌کند و آن را به کاربر ارسال می‌کند.
<br> 5.نمایش پاسخ به کاربر: در نهایت، پاسخ تولید شده توسط چت‌بات به کاربر نمایش داده می‌شود، که می‌تواند شامل متن، صدا یا تصویر باشد.
<br> <img src="chatbot-images/1.gif" alt="aaa" id='structure-pic'>`),700)
        }
        if(element.id == "advantages-and-disadvantages"){
            setTimeout(() =>{effectsMessageHandler();},700)
        }
        if(element.id == "chatbot-implementation"){
            setTimeout(() =>addBotMessage(`پیاده‌سازی یک چت‌بات شامل چند گام اصلی است که به طور کلی عبارتند از:
<br>تعریف هدف و قصد: در این گام، شما باید هدف اصلی چت‌بات خود را تعریف کنید و قصد‌هایی که کاربران ممکن است داشته باشند را شناسایی کنید. برای یک چت‌بات وب، این می‌تواند شامل ارائه خدمات، پاسخ به سوالات، یا هدایت کاربران به صفحات وب مختلف باشد.
<br>انتخاب پلتفرم و تکنولوژی: پس از تعریف هدف، باید یک پلتفرم مناسب برای پیاده‌سازی چت‌بات خود را انتخاب کنید. برای چت‌بات‌های وب، انتخاب پلتفرم‌های مانند Facebook Messenger، Slack، Telegram و.... مهم است. همچنین باید تکنولوژی‌هایی را برای پیاده‌سازی مورد نیاز انتخاب کنید، مانند Node.js، Python، PHP و ...
<br>طراحی و توسعه: در این گام، باید طراحی و توسعه چت‌بات خود را آغاز کنید. این شامل طراحی رابط کاربری (UI) مناسب برای کاربران و پیاده‌سازی الگوریتم‌های پردازش زبان طبیعی (NLP) برای تفسیر پیام‌های کاربران است.
<br>آزمون و بهینه‌سازی: پس از پیاده‌سازی، باید چت‌بات را آزمایش کنید و اطمینان حاصل کنید که به درستی عمل می‌کند. همچنین، می‌توانید با بررسی بازخوردها و بهبودهای لازم، عملکرد آن را بهبود بخشید.
`),700)
        }

    })
});
// 
function drawHistoryPart(){
    const historyItems = document.querySelectorAll(".history-item")
    const locator = document.querySelector(".locator");
    let locatorIndex = 0
    historyArray = Array(
        `آزمایش تورینگ (به انگلیسی: Turing test )، با نام اصلی بازی تقلید، توسط آلن تورینگ و در سال ۱۹۵۰ معرفی شد، این آزمایش درباره توانایی یک ماشین برای ارائه رفتارهای هوشمندانه برابر یا غیرقابل تمایز از رفتارهای یک انسان است.`
        ,`یکی از اولین نمونه‌های چت‌بات است که توسط جوزف وایزنبام در دانشگاه MIT توسعه یافت و قابلیت تعامل با کاربران را داشت .<br>
الیزا مکالمه را با استفاده از یک الگوی تطبیق روش جایگزینی شبیه‌سازی می‌کند (در علوم کامپیوتر، تطبیق الگو چک کردن دنباله‌ای از نشانه‌ها به منظور حضور ترکیباتی از برخی الگو هاست. ) <br>
الیزا در واقع به حل یا مواجهه با چندین مسئله مختلف مربوط بود:<br>
شناسایی کلیدواژه‌ها (Identification of Key Words) <br>
کشف حداقل زمینه (Discovery of Minimal Context) <br>
انتخاب تبدیل‌های مناسب (Choice of Appropriate Transformations) <br>
تولید پاسخ‌ها در غیاب کلیدواژه‌ها (Generation of Responses in the Absence of Key Words)`,
`
Parry یک برنامه رایانه‌ای است که در سال ۱۹۷۲ توسط روانپزشک کنت کولبی ایجاد شد و برای شبیه‌سازی رفتار افراد مبتلا به اسکیزوفرنی استفاده می‌شد.<br>
 آلیس در آزمون تورینگ، توانست 52 درصد از کاربرانش را فریب دهد و سه بار برنده جایزه لوبنر شد.`
,`A.L.I.C.E. (Artificial Linguistic Internet Computer Entity)<br>
یک چت‌بات است که بر اساس پردازش زبان طبیعی توسط ریچارد والاس (Richard Wallace) ساخته شده است. <br>
البته در آن زمان به دلیل عدم توسعه کافی هوش مصنوعی، آلیس اغلب اشتباهاتی آشکار را مرتکب می‌شد و در آزمون تورینگ قبول نشد.`
,`هدف اعلام شده از این پروژه ایجاد هوش مصنوعی است که قادر به قبولی در آزمون تورینگ باشد . برای تقلید از تعامل انسانی و انجام مکالمه با کاربران طراحی شده است.<br>
•	سال 1988 - پروژه هوش مصنوعی یادگیری به نام "Thoughts" تأسیس شد. <br>
•	سال 1997 - پروژه به نام "Jabberwacky" به صورت آنلاین رونمایی شد <br>
•	سال 2008 - یک نوع جدید از Jabberwacky، مبهم تر و با زمینه عمیق تر، تحت نام Cleverbot راه اندازی شد.
`
,`کوکی (انگلیسی: Kuki)، که به عنوان میتسوکو (به انگلیسی: Mitsuku) نیز شناخته می‌شود، یک چت بات است که توسط استیو ورسویک خلق شده است.<br>
این ربات مکالمه پنج بار برنده یک مسابقه تورینگ به نام جایزه لوبنر است (در ۲۰۱۳, ۲۰۱۶, ۲۰۱۷, ۲۰۱۸, و ۲۰۱۹) که برای آن رکورد جهانی دارد.`
, `ChatGPT یکی از پیشرفته‌ترین سیستم‌های چت‌بات مبتنی بر هوش مصنوعی است که توسط شرکت OpenAI توسعه یافته است.<br> این سیستم بر پایه یادگیری عمیق و بهره‌گیری از شبکه‌های عصبی مصنوعی است و با استفاده از یادگیری نظارت نشده و تقویتی به‌خوبی تنظیم شده‌است.<br>
ChatGPT از برترین چت‌بات‌های موجود در حال حاضر است .`
,`هوش مصنوعی کلود (Claude AI) نوعی چت بات مبتی بر هوش مصنوعی است که توسط شرکت Anthropic در سال 2022 معرفی شده است. این چت بات مبتی بر هوش مصنوعی می‌تواند به انسان‌ها در زمینه‌های مختلف مانند تجزیه و تحلیل داده‌ها، پاسخ به سوالات، حل مسائل ریاضی، کدنویسی، برنامه‌نویسی و موارد دیگر کمک کند و سرعت بالاتری از ChatGPT دارد .`
,`مایکروسافت کوپایلت یک ابزار مبتنی بر هوش مصنوعی (AI) است که در درجه اول برای پشتیبانی از کاربران مایکروسافت 365 طراحی شده است.<br>
در تاریخ 7 فوریه 2023 به عنوان Bing Chat به عنوان یک افزونه برای بینگ و مرورگر Edge مایکروسافت راه اندازی شد. <br> کوپایلت بر اساس مدل زبان بزرگ بنیادی GPT-4 از OpenAI ساخته شده است و جایگزین اصلی cortana است.
`
)
    addBotMessage(historyArray[locatorIndex],0,"historyMessage")

    function botHistoryMessageHandler(index){
        botHistoryMessage = document.querySelector(".historyMessage")
        chatMessages.removeChild(botHistoryMessage)
        addBotMessage(historyArray[index],0,"historyMessage")
    }

    historyItems[locatorIndex].style.color = "black";
    locatorLeft = 15
    moveLocator()
    function moveLocator() {
        const currentItem = historyItems[locatorIndex];
        const currentItemRect = currentItem.getBoundingClientRect();
        console.log(currentItemRect)
        const containerRect = currentItem.parentElement.getBoundingClientRect();
        console.log(containerRect)
        const containerLeft = containerRect.left;
        const itemLeft = currentItemRect.left;
        
        locatorLeft = itemLeft - containerLeft + (currentItem.offsetWidth / 2) - (locator.offsetWidth / 2);
        
        locator.style.left = `${locatorLeft}px`;
        botHistoryMessageHandler(locatorIndex)
    }
    document.addEventListener("keydown", function(event) {  
        if (event.key === "ArrowRight") {
            if(parseInt(historyItems.length)-1 > locatorIndex){
                historyItems[locatorIndex].style.color = "";
                locatorIndex ++
                historyItems[locatorIndex].style.color = "black";
                moveLocator()
            }
            else{
                historyItems[locatorIndex].style.color = "";
                locatorIndex = 0
                historyItems[locatorIndex].style.color = "black";
                moveLocator()
            }
        }
        else if (event.key === "ArrowLeft") {
            if(0 < locatorIndex){
                historyItems[locatorIndex].style.color = "";
                locatorIndex --
                historyItems[locatorIndex].style.color = "black";
                moveLocator()
            }
            else{
                historyItems[locatorIndex].style.color = "";
                locatorIndex = parseInt(historyItems.length)-1
                historyItems[locatorIndex].style.color = "black";
                moveLocator()
            }
        }
        
    })
}
