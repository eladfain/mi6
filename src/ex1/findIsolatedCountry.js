export function findIsolatedCountry(data){
    let agengts=agentMissonCount(data);
    let countIsolatedAgents={};
    let dataLength=data.length;
    for(let i=0; i<dataLength;i++){
      if(agengts[data[i]["agent"]]==1){
        if(countIsolatedAgents[data[i]["country"]]){
          countIsolatedAgents[data[i]["country"]]=countIsolatedAgents[data[i]["country"]]+1
        }
        else{
          countIsolatedAgents[data[i]["country"]]=1;
        }
      }
    }
      let mostIsolatedContry=Object.keys(countIsolatedAgents)[0];
      for(let country in countIsolatedAgents){
        if(countIsolatedAgents[country]>countIsolatedAgents[mostIsolatedContry]){
          mostIsolatedContry=country;
        }
      }
      return mostIsolatedContry;
  }
  
  function agentMissonCount(data){
    let agents={};
    let dataLength=data.length;
    for(let i=0; i<dataLength;i++){
      if(agents[data[i]["agent"]]){
        agents[data[i]["agent"]]=agents[data[i]["agent"]]+1;
      }
      else{
        agents[data[i]["agent"]]=1;
      }
    }
    return agents;
  }