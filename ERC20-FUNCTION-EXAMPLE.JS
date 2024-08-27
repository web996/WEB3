async function approve(token,ABI)
{
  const value =ethers.utils.parseUnits(String(30*100),18)//int to big number string :(Value string,Decimals)
  let value_str=value.toString()

  let provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner();
  console.log("Account:", await signer.getAddress());

  const Token = new ethers.Contract(token, ABI, signer)

  const res=await Token.approve(spender_addr,value_str)
  console.log(res)
}
async function get_balance()
{
  //balanceOf p1=contract p2=user_addr
  let provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner();
  const Token = new ethers.Contract(token_usdt, PermitERC20_ABI, signer)
  let acc=await signer.getAddress()
  let ret1=await Token.balanceOf(acc)
  const blance_num=ethers.utils.formatUnits(ret1, 18)
  console.log("balance:",ret1.toString())


}
async function permit()
{
  const wallet_nonces=await tokenContract.methods.nonces(current_wallet).call()
  console.log(wallet_nonces)
 const domain = {
  name: token_name,
  version: "1",
  verifyingContract: token_address,
  chainId: chainId_in,
}

// Define types
const types = {
  Permit: [
      {name: "owner", type: "address"},
      {name: "spender", type: "address"},
      {name: "value", type: "uint256"},
      {name: "nonce", type: "uint256"},
      {name: "deadline", type: "uint256"},
  ]
}

// Define transaction
const values = {
  owner: selectedAddress,
  spender: spender_addr,
  value: value,
  nonce: Number(wallet_nonces),
  deadline: deadline
}
// Sign data
const signature = await signer._signTypedData(domain, types, values);

// Split signature
const sig = ethers.utils.splitSignature(signature);

console.log(sig)

//const { v, r, s } = ethers.utils.splitSignature(sig);
// Check signature
let recovered = ethers.utils.verifyTypedData(
    domain,
    types,
    values,
    sig
)
const permitData =await tokenContract.methods.permit(owner_addr,spender_addr,amount,deadline,sig_v,sig_r,sig_s)
}
