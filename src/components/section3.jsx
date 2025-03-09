import { useState ,useEffect} from 'react'

function Section3(){

  const[notices,setNotices] = useState([
    {
      numbering:1,
      content:"這裡有一隻臘腸狗和一隻肥橘貓,腸腸有分離焦慮，都會跟在腳邊，他心情好會跟你sayHI(汪)，事先做好心理準備,請不用害怕。如果會擔心接觸他們,可事先告知,會安置在推車內，與您保持友善距離。"
    }
    ,
    {
      numbering:2,
      content:"施作需2.5～4小時(依施作項目)，預約前請事先評估預留足夠時間，趕時間的人請斟酌預約。"
    }
    ,
    {
      numbering:3,
      content:"可傳圖報價，但因手法、素材不同,無法100%完全複製，請理解見諒。"
    }
    ,
    {
      numbering:4,
      content:"不接受病變甲及皮膚病，有此狀況會立即中止服務。"
    }
    ,
    {
      numbering:5,
      content:"請確定好日期及時間在做預約,若要取消、更改時段請於3天前告知。"
    }
    ,
    {
      numbering:6,
      content:"完成預約後，款式請提前三天與我討論呦。"
    }
    ,
    {
      numbering:7,
      content:"預約時間請準時，現場保留10分鐘，遲到請告知，超過時間視同取消。"
    }
    ,
    {
      numbering:8,
      content:"當日放鳥、遲到及臨時取消，達3次者將不再服務。"
    }
    ,
    {
      numbering:9,
      content:"施作前請避免指甲修剪過短，以確保施作品質。"
    }
    ,
    {
      numbering:10,
      content:"工作室僅能喝水及飲料，禁止飲食。"
    }
    ,
    {
      numbering:11,
      content:"私宅一人作業工作室，有獨立空間，請勿攜伴及寵物。"
    }
    ,
    {
      numbering:12,
      content:"美甲屬於1對1個人服務，一定會在溝通確定後才施作，服務後無提供免費卸甲及不滿意退費機制。"
    }
    ,
    {
      numbering:13,
      content:"目前服務都未收取訂金，請寶寶們遵守條款，尊重彼此的時間及權益。"
    }
    ,
    {
      numbering:14,
      content:"同業預約請事先告知，謝謝。"
    }
  ]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // console.log(windowWidth)
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return(
    <>
    <div className="bg-neutral-100 overflow-x-hidden">
      <section className='container '>
        <div className="py-5 py-md-13 mx-auto" >
          <h2 className='fs-6 fs-md-7 text-primary-02 text-center mb-4 fw-semibold fw-md-bold'>預約須知</h2>
          <div  className="py-3 px-5 text-primary fs-md-4 bg-neutral-200 text-center mb-6 mb-md-11 mx-auto">預約諮詢請加Line@:@893ukbbx</div>
            <div className="row justify-content-end mb-6 mb-md-11 ">
              {windowWidth < 992 ?
              <div className='mb-5' >
              <img className='h-100 w-100' src="26544.jpg" alt="" style={{borderTopRightRadius:64,objectFit:"cover",maxHeight:windowWidth < 576? 248: windowWidth< 768 ? 344 : 464}}/>
            </div>
              :
              <div className="col-lg-6 position-relative">
              <div className=" overflow-hidden position-absolute h-100" style={{borderTopRightRadius:64,width:868,right:100}}>
                  <img className='h-100 w-100' src="26544.jpg" alt="" />
              </div>
              </div>
              }
              
              <div className="col-lg-6">
              {notices.map(({numbering,content}) => {
                return(
                  numbering !== 14 ?
                  <div className="d-flex align-items-start mb-4" key={numbering}>
                    <div className="px-1 me-4" style={{paddingTop:2}}>
                    <div className='rounded-pill bg-primary text-center text-white fw-bold' style={{minWidth:24,minHeight:24}}>{numbering}</div>
                    </div>
                    <p className='fs-2 fs-md-3 text-primary-02'>{content}</p>
                  </div>
                  :
                  <div className="d-flex align-items-start " key={numbering}>
                    <div className="px-1 me-4" style={{paddingTop:2}}>
                    <div className='rounded-pill bg-primary text-center text-white fw-bold' style={{minWidth:24,minHeight:24}}>{numbering}</div>
                    </div>
                    <p className='fs-2 fs-md-3 text-primary-02'>{content}</p>
                  </div>
                )
                })}
            </div>
          </div>
          <h3 className='fs-3 fs-md-5 text-primary-02 text-center'>詳細閱讀後預約代表同意以上條款</h3>
        </div>
      </section>
    </div>
    <div className="bg-neutral-200 overflow-x-hidden">
      <section className='container '>
        <div className="py-6 py-md-13 mx-auto">
          <h2 className='fs-6 fs-md-7 text-primary-02 text-center mb-4 fw-semibold fw-md-bold mb-6 mb-md-11'>價目表 Price</h2>
          <div className="row">
            <div className="col-lg-6 ">
              <table className="table table-spacing-sm table-borderless table-neutral-200 mb-2 " style={{marginLeft:-4}}>
                <thead >
                  <tr className='text-primary-02 fs-md-5 fw-bold' >
                    <th  scope="col" style={{minWidth:180,maxWidth:324}}>凝膠項目</th>
                    <th  scope="col">手部</th>
                    <th scope="col">足部</th>
                  </tr>
                </thead>
                <tbody className='fs-md-4 fw-md-medium'>
                  <tr>
                    <th className='fw-nomal fw-md-medium' scope="row" >單色</th>
                    <td>800</td>
                    <td>1000</td>
                  </tr>
                  <tr>
                    <th className='fw-nomal fw-md-medium' scope="row" >特殊色</th>
                    <td>900</td>
                    <td>1100</td>
                  </tr>
                  <tr>
                    <th className='fw-nomal fw-md-medium' scope="row" >鏡面</th>
                    <td>1000</td>
                  </tr>
                  <tr>
                    <th className='fw-nomal fw-md-medium' scope="row" >法式</th>
                    <td>1200</td>
                  </tr>
                  <tr>
                    <th className='fw-nomal fw-md-medium' scope="row" >手繪款</th>
                    <td>1300up</td>
                  </tr>
                </tbody>
              </table>
              <small className='text-primary-02'>(花磚、Q 版小手繪、等...)</small>
              <hr className='border-secondary-200'/>
              <table className="table table-spacing-sm table-borderless table-neutral-200 mb-2 " style={{marginLeft:-4}}>
                <tbody className='fs-md-4 fw-md-medium'>
                  <tr>
                    <th className='fw-nomal fw-md-medium' scope="row" >當月款式</th>
                    <td>1000</td>
                  </tr>
                  <tr>
                    <th className='fw-nomal fw-md-medium' scope="row" >指定款式</th>
                    <td>1000up</td>
                  </tr>
                </tbody>
              </table>
              <small className='text-primary-02'>(可攜圖、可依預算討論設計)</small>
              <hr />
              <table className="table table-spacing-sm table-borderless table-neutral-200 mb-0 " style={{marginLeft:-4}}>
                <tbody >
                  <tr>
                    <th className='fs-md-5'>延甲</th>
                    <td className='fw-nomal fw-md-medium fs-md-4'>150/指</td>
                    <td className='fw-nomal fw-md-medium fs-md-4'>150/指</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <table className="table table-spacing-sm table-borderless table-neutral-200 mb-0 " style={{marginLeft:-4}}>
                <tbody >
                  <tr>
                    <th className='fs-md-5'>基礎保養</th>
                    <td className='fw-nomal fw-md-medium fs-md-4'>500</td>
                    <td className='fw-nomal fw-md-medium fs-md-4'>650</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <table className="table table-spacing-sm table-borderless table-neutral-200 mb-5 mb-md-6 mb-lg-0" style={{marginLeft:-4}}>
                <thead className='align-top'>
                  <tr className='text-primary-02 fs-md-5 fw-bold' >
                    <th  scope="col" style={{minWidth:180,maxWidth:324}}>卸甲 <span className='fs-2 d-block d-md-inline'>(手足同價)</span></th>
                    <th  scope="col">本店</th>
                    <th scope="col">他店</th>
                  </tr>
                </thead>
                <tbody className='fs-md-4 fw-md-medium'>
                  <tr>
                    <th className='fw-nomal fw-md-medium' scope="row" >卸甲續做</th>
                    <td>200</td>
                    <td>300</td>
                  </tr>
                  <tr>
                    <th className='fw-nomal fw-md-medium' scope="row" >純卸甲</th>
                    <td>250</td>
                    <td>550</td>
                  </tr>
                  <tr>
                    <th className='fw-nomal fw-md-medium' scope="row" >不續做＋保養</th>
                    <td>250</td>
                  </tr>
                  <tr>
                    <th className='fw-nomal fw-md-medium' scope="row" >卸鑽</th>
                    <td>50/指</td>
                  </tr>
                </tbody>
              </table>
            </div>
              {windowWidth < 992 ?
                <img className='w-100' style={{borderTopLeftRadius:64,objectFit:"cover",maxHeight:windowWidth < 576? 248: windowWidth< 768 ? 344 : 464}} src="2149171334.jpg" alt="" />
                :
                <div className="col-lg-6 position-relative">
                <div className=" overflow-hidden position-absolute h-100" style={{borderTopLeftRadius:64,width:908,left:100}}>
                    <img className='h-100 w-100' src="2149171334.jpg" alt="" />
                </div>
                </div>
                }
          </div>
        </div>
      </section>
    </div>
    <div className="linear">
      <section className='container'>
        <div className="py-6 py-md-13 mx-auto">
        <h2 className='fs-6 fs-md-7 text-primary-02 text-center mb-4 fw-semibold fw-md-bold mb-6 mb-md-11'>NOTES</h2>
          <div className="row align-items-center mb-6 mb-md-11">
              {windowWidth < 992 ?
                  <div className='mb-5' >
                  <img className='h-100 w-100' src="2149975490.jpg" alt="" style={{borderTopRightRadius:64,objectFit:"cover",maxHeight:windowWidth < 576? 248: windowWidth< 768 ? 344 : 464}}/>
                </div>
                  :
                  <div className="col-lg-6 position-relative" style={{minHeight:574}}>
                  <div className=" overflow-hidden position-absolute h-100" style={{borderTopRightRadius:64,width:956,minHeight:574,right:100}}>
                      <img className='h-100 w-100' src="2149975490.jpg" alt="" />
                  </div>
                  </div>
                  }
            <div className="col-lg-6 ">
              <div className="d-flex align-items-start mb-4">
                <div className="px-1 me-4" style={{paddingTop:2}}>
                <div className='rounded-pill bg-primary text-center text-white fw-bold' style={{minWidth:24,minHeight:24}}>1</div>
                </div>
                <p className='fs-2 fs-md-3 text-primary-02'>凝膠項目皆含基礎保養及加厚</p>
              </div>
              <div className="d-flex align-items-start mb-4">
                <div className="px-1 me-4" style={{paddingTop:2}}>
                <div className='rounded-pill bg-primary text-center text-white fw-bold' style={{minWidth:24,minHeight:24}}>2</div>
                </div>
                <p className='fs-2 fs-md-3 text-primary-02'>基礎保養含修剪甲型、甘皮、兩側硬皮、硬甲油塗佈及指緣油保養</p>
              </div>
              <div className="d-flex align-items-start mb-4">
                <div className="px-1 me-4" style={{paddingTop:2}}>
                <div className='rounded-pill bg-primary text-center text-white fw-bold' style={{minWidth:24,minHeight:24}}>3</div>
                </div>
                <p className='fs-2 fs-md-3 text-primary-02'>純卸甲均不含保養，可另外加購保養</p>
              </div>
              <div className="d-flex align-items-start">
                <div className="px-1 me-4" style={{paddingTop:2}}>
                <div className='rounded-pill bg-primary text-center text-white fw-bold' style={{minWidth:24,minHeight:24}}>4</div>
                </div>
                <p className='fs-2 fs-md-3 text-primary-02'>現場提供現金及轉帳交易</p>
              </div>
            </div>
          </div>
          <h3 className='fs-3 fs-md-5 text-primary-02 text-center'>2024/3月正式啟用</h3>
        </div>
      </section>
    </div>
    </>
  )
}

export default Section3