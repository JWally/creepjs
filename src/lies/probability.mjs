
import {BayesTheorem} from "../utils/bayes.mjs";

const probability = async (fp) => {
  
    let prior = 0.1;
  
    // //////////////////////////////////////////////////////////////////////////
    // BOT CHECKS
    // //////////////////////////////////////////////////////////////////////////
  
    // Check Like Headless
    for (let x in fp.headless.likeHeadless) {
      if (fp.headless.likeHeadless[x]) {
        prior = BayesTheorem(prior, 0.65, 0.5);
      }
    }
  
    // Check headless
    for (let x in fp.headless.headless) {
      if (fp.headless.headless[x]) {
        prior = BayesTheorem(prior, 0.65, 0.5);
      }
    }
  
    // Check Stealth
    for (let x in fp.headless.stealth) {
      if (fp.headless.stealth[x]) {
        prior = BayesTheorem(prior, 0.65, 0.5);
      }
    }
  
    // //////////////////////////////////////////////////////////////////////////
    // INSTANT FAIL
    // //////////////////////////////////////////////////////////////////////////
  
    // Extra Headless Check. Driver on = BOT.
    if (fp.headless.headless.webDriverIsOn) {
      prior = BayesTheorem(prior, 0.99, 0.01);
    }
  
    // Extra Headless Check. Driver on = BOT.
    if (
      fp.navigator.system !== "Linux" &&
      fp.navigator?.userAgentData?.brands?.[0] == "Chromium"
    ) {
      prior = BayesTheorem(prior, 0.99, 0.01);
    }
  
    // //////////////////////////////////////////////////////////////////////////
    // LIES
    // //////////////////////////////////////////////////////////////////////////
    const lieCount = fp.lies.totalLies;
  
    if (lieCount < 20) {
      prior = BayesTheorem(prior, 0.25, 0.65);
    }
  
    if (lieCount >= 20 && lieCount < 60) {
      prior = BayesTheorem(prior, 0.65, 0.5);
    }
  
    if (lieCount >= 60 && lieCount < 100) {
      prior = BayesTheorem(prior, 0.9, 0.25);
    }
  
    if (lieCount >= 100 && lieCount < 10_000) {
      prior = BayesTheorem(prior, 0.9, 0.05);
    }
  
    // //////////////////////////////////////////////////////////////////////////
    // RESISTANCE
    // //////////////////////////////////////////////////////////////////////////
    if (
      Object.keys(fp.resistance.extensionHashPattern).length == 0
    ) {
      prior = BayesTheorem(prior, 0.3, 0.5);
    } else {
      prior = BayesTheorem(prior, 0.5, 0.3);
    }
  
    // //////////////////////////////////////////////////////////////////////////
    // CC-AGE
    // //////////////////////////////////////////////////////////////////////////
  
  
    return prior;
  };
  
  export { probability };
  