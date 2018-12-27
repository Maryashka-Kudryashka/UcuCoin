pragma solidity ^0.4.2;

contract UCUToken {

    string  public name = "UCU Token";
    string  public symbol = "UCU";
    string  public standard = "UCU Token v1.0";

    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;


    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    function UCUToken(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(_value >= 0);
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        Transfer(msg.sender, _to, _value);
        return true;
    }
}
