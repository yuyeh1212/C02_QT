import { useState } from "react";

function Section2() {
  const [cardData] = useState([
    {
      title: "Step 1",
      image: "/Default.png",
      subTitle: "登入/註冊",
      description: "確認您的身分，請登入或註冊為會員。",
    },
    {
      title: "Step 2",
      image: "/Variant2.png",
      subTitle: "觀看預約須知",
      description:
        "預約前，請先仔細閱讀預約須知及價目表，確認您所需的服務項目。",
    },
    {
      title: "Step 3",
      image: "/Variant3.png",
      subTitle: "前往預約",
      description: "點擊前往預約按鈕，進入預約介面選擇日期並填寫相關資訊。",
    },
    {
      title: "Step 4",
      image: "/Variant4.png",
      subTitle: "溝通造型",
      description: "添加官方 line 帳號，並與美甲師溝通想施作的造型樣式。",
    },
    {
      title: "Step 5",
      image: "/Variant5.png",
      subTitle: "出發施作美甲",
      description:
        "按照預約的時間與地點，享受專業的美甲服務，讓您的指甲美美的吧！",
    },
  ]);

  return (
    <div className="bg-neutral-200 py-12">
      <section className="container mx-auto text-center">
        <h2 className="text-primary-02 fs-7 font-semibold mb-6">預約步驟</h2>
        <div className="row gap-8 px-4 mx-auto">
          {cardData.map((item, index) => (
            <div key={index} className="col-12 col-xl-2">
              <h3 className="fs-6 font-bold text-gray-800 mb-4">
                {item.title}
              </h3>
              <img
                src={item.image}
                alt={item.subTitle}
                className="w-[240px] h-[196px] object-cover rounded-lg"
              />
              <h4 className="fs-5 font-semibold text-gray-700 mt-6">
                {item.subTitle}
              </h4>
              <p className="fs-3 text-gray-600 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Section2;
