
/**
 * Calculate the posterior probability using Bayes' theorem.
 * @param {number} prior - The prior probability.
 * @param {number} p_e_given_h - The probability of evidence given the hypothesis.
 * @param {number} p_e_given_not_h - The probability of evidence given the negation of the hypothesis.
 * @returns {number} The posterior probability.
 */
function BayesTheorem(prior, p_e_given_h, p_e_given_not_h) {
    const logPrior = Math.log(prior);
    const log_p_e_given_h = Math.log(p_e_given_h);
    const log_p_e_given_not_h = Math.log(p_e_given_not_h);
  
    const log_numerator = log_p_e_given_h + logPrior;
    const log_denominator = Math.log(
      Math.exp(log_numerator) +
        Math.exp(log_p_e_given_not_h + Math.log(1 - Math.exp(logPrior)))
    );
    const log_p_h_given_e = log_numerator - log_denominator;
  
    return Math.exp(log_p_h_given_e);
  }

  export {BayesTheorem}