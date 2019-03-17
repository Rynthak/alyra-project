var ClassifiedAds = artifacts.require("./ClassifiedAds.sol");

module.exports = function(deployer) {
    deployer.deploy(ClassifiedAds);
};