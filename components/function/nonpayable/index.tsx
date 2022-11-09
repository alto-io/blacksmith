import Button from "components/button";
import Inputs from "components/inputs";
import {
  AbiDefinedFunction,
  AbiParameterWithComponents,
  Address,
} from "core/types";
import { useArgs } from "hooks";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import Container from "../container";
import Signature from "../signature";

type NonpayableProps = {
  address: Address;
  func: AbiDefinedFunction;
};

const Nonpayable = ({ address, func }: NonpayableProps) => {
  const { args, formattedArgs, updateValue } = useArgs(
    func.inputs as AbiParameterWithComponents[]
  );
  const { config } = usePrepareContractWrite({
    address,
    abi: [func],
    functionName: func.name,
    args: formattedArgs,
  });
  const { write, isLoading } = useContractWrite(config);
  const isDisabled = isLoading || !write;
  const handleClick = () => {
    write?.();
  };

  return (
    <li key={func.name} className="flex flex-col gap-2">
      <Signature func={func} />
      <Inputs name={func.name} args={args} updateValue={updateValue} />
      <Container>
        <Button type="button" disabled={isDisabled} onClick={handleClick}>
          write
        </Button>
      </Container>
    </li>
  );
};

export default Nonpayable;
