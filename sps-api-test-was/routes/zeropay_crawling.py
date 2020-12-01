import pandas as pd
import requests

def get_data_by_page(page, skkCode):
    first_index = 1 + (10 * (page - 1))
    last_index = page * 10

    url = "https://www.zeropay.or.kr/intro/frncSrchList_json.do"
    headers = {
        "Cookie": "_xm_webid_1_=402747498; JSESSIONID=suaqBFD1jNMdRaOAUaIhF4oMrC3HUspDPhEZ8nSdj7RlI2x1VO5jIuvQ8hRznoKp.enBheV9kb21haW4venBheS1ob21lcGFnZS0y; ACEUACS=1589342374242269518; ACEUCI=1; ACEFCID=UID-5FC61C90977E8850A34BFD8F; _gid=GA1.3.2002140421.1606818961; AUAZ1A78776=1606822367899396542%7C3%7C1606818960402260578%7C1%7C1606818960774GEMZV; _fbp=fb.2.1606823694743.1895261631; _gat_gtag_UA_156020264_1=1; _ga_9GS993V6FX=GS1.1.1606823717.1.1.1606823786.0; wcs_bt=s_4ab8cf5ec090:1606823793; ARAZ1A78776=httpswwwzeropayorkrmaindopgmIdPGM0081httpswwwgooglecom; _ga=GA1.3.526662027.1606818961; ASAZ1A78776=1606822367899396542%7C1606823796502580112%7C1606823694301169924%7C0%7Chttpswwwgooglecom"
    }
    data = {
        "pageIndex" : "1",
        "recordCountPerPage" : "10", 
        "firstIndex" : first_index,
        "lastIndex" : last_index,
        "tryCode" : "01",
        "skkCode" : skkCode,
        "_csrf": "1ee50e8c-5d2d-4b03-b13b-7397863e7f2f"
    }

    res = requests.post(url, headers=headers, data=data)

    try:
        res = res.json()
    except Exception as e:
        print(e)
        exit()

    if res['result'] == "FAIL":
        print(res["msg"])
        exit()

    return pd.DataFrame(res["list"], columns = ['pobsBaseAddr', 'pobsDtlAddr', 'pobsAfstrName', 'bztypName']), len(res["list"])

if __name__ == "__main__":
    df = pd.DataFrame()
    for skkCode in range(100):
        for i in range(10):
            df_new, length = get_data_by_page(i, skkCode)
            if length > 0:
                df = df.append(df_new)
                # print(df_new)

    df.reset_index(drop=True, inplace=True)
    # df.to_json('zeropay.json', orient='table')
    df.to_excel("/Users/nuung/Desktop/CodingStudy/NH-share-payment/sps-api-test-was/routes/zeropay.xlsx")