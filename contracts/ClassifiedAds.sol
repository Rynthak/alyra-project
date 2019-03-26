pragma solidity ^0.5.2;


import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract ClassifiedAds is Ownable{
	using SafeMath for uint256;	
	bytes32[] public ads;
	mapping (bytes32 => address) public  ads_owner;
 	event Ads(
        bytes32 ads,
        address owner
    );
	 
	function payNewAds(bytes32 _ads) public payable{
		require(msg.value  >= 100 finney,"La somme envoyé n'est pas suffisante");
		ads.push(_ads);
		ads_owner[_ads]=msg.sender;		
		emit Ads(_ads,msg.sender);		
	} 
	
	
}