contract Vault {
    function withdraw(address payable to, uint256 amount) external {
        to.call{value: amount}("");
    }
}
