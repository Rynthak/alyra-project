pragma solidity ^0.5.2;


import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract ClassifiedAds is Ownable{
	using SafeMath for uint256;	
	string[] public ads;	 
	mapping (address => string[]) public  ads_owner;
	mapping (address => uint256) public  ads_owner_nb;
 	event Ads(
        string ads,
        address owner
    );
	 
	function payNewAds(string memory _ads) public payable{
		require(msg.value  >= 100 finney,"La somme envoyé n'est pas suffisante");
		ads.push(_ads);		 
		ads_owner[msg.sender].push(_ads);	
		ads_owner_nb[msg.sender]=ads_owner_nb[msg.sender].add(1);
		emit Ads(_ads,msg.sender);		
	} 
	
	
}