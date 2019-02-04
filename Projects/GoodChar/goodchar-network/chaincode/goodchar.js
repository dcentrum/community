
'use strict';
const shim = require('fabric-shim');
const util = require('util');

let Chaincode = class {
    
    async Init(stub) {
        let ret = stub.getFunctionAndParameters();
        console.info(ret);
        console.info('========= instantiated goodchar chaincode =========');

        // register localNgo, localNgo2 and gc

        return shim.success();
    }

    async Invoke(stub) {
        let ret = stub.getFunctionAndParameters();
        console.info(ret);

        let method = this[ret.fcn];
        if (!method) {
            console.error('no function of name '+ ret.fcn +' found');
            throw Error('received unknown function '+ ret.fcn + 'invocation');
        }

        try {
            let payload = await method(stub, ret.params);
            return shim.success(payload);
        } catch (err) {
            console.log(err);
            return shim.console.error(err);
        }
    }

    async InitLedger(stub, args) {
        console.info('=========== InitLedger invoked ===========');
    }

    async RegisterLocalNgo(stub, args) {
        console.info('------ Start RegisterLocalNgo ------');
        let ret = stub.getFunctionAndParameters();
        console.info(ret);

        if (args.length != 3) {
            throw new Error('Incorrect number of arguments. Expecting 3');
        }

        let localNgoName = args[0];
        let localNgoMobileNo = args[1];
        let localNgoAddress = args[2];

        // ==== Check if localNgo already exists ====
        let localNgoState = await stub.getState(localNgoName);
        if (localNgoState.toString()) {
            throw new Error('This localNgo already exists: ' + localNgoName);
            //localNgoId = 
        }
        
        // ==== Create localNgo object and marshal to JSON ====
        let localNgo = {};
        localNgo.name = localNgoName;
        localNgo.mobileNo = localNgoMobileNo;
        localNgo.address = localNgoAddress;
        //localNgo.id = localNgoId;

        // === Save localNgo to state ===
        await stub.putState(localNgoName, Buffer.from(JSON.stringify(localNgo)));
        console.info('------ End RegisterLocalNgo ------');
    }

    async RegisterLocalVolunteer(stub, args) {
        
    }

    async StartDonationCamp(stub, args) {
        
    }

    async AssetLotTag(stub, args) {
        
    }

    async AssetTag(stub, args) {
        
    }

    async AssetQRScan(stub, args) {
        
    }

    async PlayAudio(stub, args) {
        
    }

    async CaptureBiomatricOfDonee(stub, args) {
        
    }
};

shim.start (new Chaincode());