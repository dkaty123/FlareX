
import React from 'react';
import { Globe } from 'lucide-react';

const BridgeHeader = () => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
        <Globe className="w-8 h-8 mr-3 text-blue-400" />
        LayerZero Omnichain Bridge
      </h2>
      <p className="text-purple-300 max-w-3xl mx-auto">
        Bridge assets and FTSO price feeds across any blockchain using LayerZero's Ultra Light Node technology.
        Experience true omnichain interoperability with maximum security and minimal cost.
      </p>
    </div>
  );
};

export default BridgeHeader;
