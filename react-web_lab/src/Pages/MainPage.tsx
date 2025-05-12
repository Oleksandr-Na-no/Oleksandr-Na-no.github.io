import Footer from "../components/Footer/Footer";

function MainPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-h-screen overflow-hidden relative">
        <img
          src="/assets/main.jpg"
          alt="Main Page"
          className="w-full h-full [mask-image:linear-gradient(black_10%,transparent)]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <b className="text-[color:var(--primary)] text-6xl font-bold bg-black/50 px-5 py-2">
            Фотокурси
          </b>
        </div>
      </div>
      <div className="max-w-[1100px] pt-5 pr-[100px] text-center pb-2.5 pl-[100px] m-0 flex content-center flex-col ">
        <h1 className="mb-5 text-4xl">Про курси</h1>
        <p className="text-justify text-2xl">
          Онлайн-курси з фотографії допоможуть освоїти зйомку, композицію та
          обробку фото. Вони підходять усім, хто хоче покращити навички. Гнучкий
          графік і підтримка викладачів роблять навчання ефективним.
        </p>
        <hr className="m-10" />
        <h2 className="text-4xl mb-10">В цому курсі ви вивчете</h2>
        <ul className="list-disc pl-5 text-justify text-2xl">
          <li>
            Основи фотографії – як працює камера, витримка, діафрагма, ISO.
          </li>
          <li>
            Композиція кадру – правила третин, симетрія, баланс, лінії та точки
            інтересу.
          </li>
          <li>
            Світло у фотографії – природне та штучне освітлення, використання
            рефлекторів та спалахів.
          </li>
          <li>
            Портретна зйомка – як працювати з моделями, вибір фону та
            налаштування камери.
          </li>
          <li>
            Пейзажна фотографія – як знімати красиві краєвиди, використання
            фільтрів та штатива.
          </li>
          <li>
            Макрофотографія – зйомка дрібних об’єктів, вибір об’єктива та
            фокусування.
          </li>
          <li>
            Нічна та астрофотографія – як знімати зірки, місячне світло, довгі
            витримки.
          </li>
          <li>
            Редагування фото – робота з Photoshop та Lightroom, кольорокорекція,
            ретуш.
          </li>
          <li>
            Репортажна фотографія – як фотографувати події, вловлювати емоції та
            рух.
          </li>
          <li>
            Студійна фотографія – робота з освітленням, задником та обладнанням
            у студії.
          </li>
        </ul>
        <text className="text-1xl mb-10 text-justify ">
          Кожна з цих тем допоможе стати більш професійним фотографом! 📷✨
        </text>
      </div>

      <Footer />
    </div>
  );
}

export default MainPage;
