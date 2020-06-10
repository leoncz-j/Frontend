import React, { useState } from 'react';
import AddNews from '../../components/AddNews';
import Result from '../Result/Result';
import fetchAPI from '../../utils/fetchAPI';
import scoreCalc from './ScoreCalc'
import { useTranslation } from 'react-i18next';

export default function Check () {
  const { t } = useTranslation();
  const [checkResult, setCheckResult] = useState(null);
  const [detailedResult, setDetailedResult] = useState(null);
  const [requestData, setRequestData] = useState(null);
  const [verifiable, setVerifiable] = useState(null);

  
  const handleSendData = async (data) => {
    setRequestData(data);


    const responseResults = {
      trustedPB : null,
      fakeSearch : null,
      mlPredict : null,
    }
    
    if (data.url){
      const srcaperResponse = await fetchAPI.postData("https://apim-checkdenfakt-prod-we-001.azure-api.net/webscraper/WebScraperFunc", {url: data.url});
      responseResults.trustedPB = await fetchAPI.postData("https://apim-checkdenfakt-prod-we-001.azure-api.net/trustedpublisher/GetTrustedPublisher", {url: data.url});
      data.text = srcaperResponse ? srcaperResponse.text : null;
      console.log("Scraper: ",srcaperResponse, "TrustedPB: ", responseResults.trustedPB);
    }
    if (data.text){
      responseResults.fakeSearch = await fetchAPI.postData("https://apim-checkdenfakt-prod-we-001.azure-api.net/fakenewssearch/Search", {text: data.text});
      const modelJSONResponse = await fetchAPI.postData("https://apim-checkdenfakt-prod-we-001.azure-api.net/classifyfakenews/prediction", {text: data.text});
      responseResults.mlPredict = JSON.parse(modelJSONResponse);
      console.log("fakeSearch: ",responseResults.fakeSearch, "model: ", responseResults.mlPredict);
    }
    else{
      console.error("Got no text from scraper or input");
    }
    console.log("Scraper")
    const scores  = scoreCalc(responseResults);
    const overallScore = scores.overallScore;
    const detailedScores = scores.detailedScores;
    //const overallScore = modelResponse + searchResponse + trustedPubResponse
    setCheckResult(overallScore);
    setDetailedResult(detailedScores);
    setVerifiable(true);
  } 


  return (
    <div className="text-center mt-5">
      {detailedResult ? <Result verifable={verifiable} requestData={requestData} overallScore={checkResult} detailedResult={detailedResult} /> : 
        <div>
          <h1>
            {t('checkCoronaMessage')}
          </h1>
          <p className="lead">
            {t('unsureIfThisNews')}
          </p>
        <div className="d-flex justify-content-center my-n4">
          <div className="polygon background-color-2">
            <AddNews onSubmit={handleSendData}/>
          </div>
        </div>
      </div>}
      <p className="mb-5">
        <a href="./about" className="purple">
          <strong>{t('howDoYouDoThat')}</strong>
        </a>
      </p>
    </div>
  );
}