var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "#LEGEND-Data-Format-Specs-[DRAFT]-1",
    "page": "Home",
    "title": "LEGEND Data Format Specs [DRAFT]",
    "category": "section",
    "text": ""
},

{
    "location": "#General-considerations-1",
    "page": "Home",
    "title": "General considerations",
    "category": "section",
    "text": "In the interest of long-term data accessibility and to ensure compliance with FAIR data principles, The number of different file formats should be kept to a reasonable minimum.\nOnly mature, well documented and and widely supported data formats with mature implementations/bindings for multiple programming languages are used.\nCustom file formats are, if at all, only used for raw data produced by DAQ systems. As raw data tends to be archived long-term, any custom raw data formats must fulfil the following requirements:\nA complete formal description of the format exists and is made publicly available under a license that allows for independent third-party implementations.\nAt least verified implementations is made publicly available under an open-source license."
},

{
    "location": "#Choice-of-file-formats-(preliminary)-1",
    "page": "Home",
    "title": "Choice of file formats (preliminary)",
    "category": "section",
    "text": "Depending on the kind of data, the following formats are preferred:Binary data: HDF5\nMetadata: JSON"
},

{
    "location": "#Abstract-data-model-1",
    "page": "Home",
    "title": "Abstract data model",
    "category": "section",
    "text": "LEGEND data should, whereever possible, be representable by a simple data model consisting of:Scalar values\nVectors or higher-dimensional arrays. Arrays may be flat and contain scalar numerical values or nested and contain arrays, but must not contain structs or tables.\nStructs (resp. \"Dicts\" or named tuples) of named fields. Fields may contain scalar values, arrays or structs. In-memory representations of structs may be objects, named t\nTables (a.k.a. \"DataFrames\"), represented by structs of column-vectors of equal length.Numerical values may be accompanied by physical units.A generic mapping of this data model must be defined for each file format used. The mapping must be self-documenting."
},

{
    "location": "hdf5/#",
    "page": "HDF5",
    "title": "HDF5",
    "category": "page",
    "text": ""
},

{
    "location": "hdf5/#HDF5-File-Format-[Incomplete]-1",
    "page": "HDF5",
    "title": "HDF5 File Format [Incomplete]",
    "category": "section",
    "text": "HDF5 is used as the primary binary data format in LEGEND.The following describes a mapping between the abstract data model and HDF5. This specifies the structure of the HDF5 implicitly, but precisely, for any data that conforms to the data model. The mapping purposefully uses only common and basic HDF5 features, to ensure it can be easily and reliably implemented in multiple programming languages."
},

{
    "location": "hdf5/#HDF5-datasets,-groups-and-attributes-1",
    "page": "HDF5",
    "title": "HDF5 datasets, groups and attributes",
    "category": "section",
    "text": "Different data types may be stored as an HDF5 dataset of the same type (e.g. a 2-dimensional dataset may represent a matrix or a vector of same-sized vectors). To make the HDF5 files self-documenting, the HDF5 attribute \"datatype\" is used to indicate the type semantics of datasets and groups."
},

{
    "location": "hdf5/#Abstract-data-model-representation-1",
    "page": "HDF5",
    "title": "Abstract data model representation",
    "category": "section",
    "text": "The abstract data model is mapped as follows:"
},

{
    "location": "hdf5/#Scalar-values-1",
    "page": "HDF5",
    "title": "Scalar values",
    "category": "section",
    "text": "Single scalar values are stored as 0-dimensional datasetsAttribute \"datatype\": \"real\", \"string\", \"symbol\", ..."
},

{
    "location": "hdf5/#Arrays-1",
    "page": "HDF5",
    "title": "Arrays",
    "category": "section",
    "text": ""
},

{
    "location": "hdf5/#Flat-arrays-1",
    "page": "HDF5",
    "title": "Flat arrays",
    "category": "section",
    "text": "Flat n-dimension arrays are stored as n-dimensional datasetsAttribute \"datatype\": \"array<n>{ELEMENT_TYPE}\""
},

{
    "location": "hdf5/#Fixed-sized-arrays-1",
    "page": "HDF5",
    "title": "Fixed-sized arrays",
    "category": "section",
    "text": "...Attribute \"datatype\": \"fixedsizearray<n>{ELEMENTTYPE}\""
},

{
    "location": "hdf5/#Arrays-of-arrays-of-same-size-1",
    "page": "HDF5",
    "title": "Arrays of arrays of same size",
    "category": "section",
    "text": "Nested arrays of dimensionality n, m are stored as flat n+m dimensional datasets.Attribute \"datatype\": \"arrayofequalsizedarrays<n,m>{ELEMENTTYPE}\""
},

{
    "location": "hdf5/#Vectors-of-vectors-of-different-size-1",
    "page": "HDF5",
    "title": "Vectors of vectors of different size",
    "category": "section",
    "text": "A Vector of vectors is stored as a group that contains two datasets:A 1-dimensional dataset \"flattened_data\" that stores the concatenation of all vectors into a single vector.\nA 1-dimensional dataset \"cumulative_length\" that stores the cumulative sum of the length of all vectors.HDF5 Attributes of the group:\"datatype\": \"array<1>{array<1>{ELEMENT_TYPE}}\"The two datasets in the group also have \"datatype\" (and possibly \"units\") attributes that match their content."
},

{
    "location": "hdf5/#Structs-1",
    "page": "HDF5",
    "title": "Structs",
    "category": "section",
    "text": "Structs are stored as HDF5 groups. Fields that are structs themselves are stored as sub-groups, scalars and arrays as datasets. Groups and datasets in the group are named after the fields of the struct.HDF5 Attributes:\"datatype\": \"struct{FIELDNAME1,FIELDNAME2,...}\""
},

{
    "location": "hdf5/#Tables-1",
    "page": "HDF5",
    "title": "Tables",
    "category": "section",
    "text": "A Table are stored are group of datasets, each representing a column of the table.HDF5 Attributes:\"datatype\": \"table{COLNAME1,COLNAME2,...}\""
},

{
    "location": "hdf5/#Enums-1",
    "page": "HDF5",
    "title": "Enums",
    "category": "section",
    "text": "Enum values are stores as integer values, but with the \"datatype\" attribute: \"enum{NAME=INTVALUE,...}\". So a vector of enum values will have a \"datatype\" attribute like \"array<N>{enum{NAME=INTVALUE,...}}\"\""
},

{
    "location": "hdf5/#Values-with-physical-units-1",
    "page": "HDF5",
    "title": "Values with physical units",
    "category": "section",
    "text": "For values with physical units, the dataset only contains the numerical values. The attribute \"units\" stores the unit information. The attribute value is the string representation of the common scientific notation for the unit. Unicode must not be used.HDF5 Attributes:\"units\": e.g. \"mm\", \"ns\", \"keV\""
},

{
    "location": "hdf5/#Examples-1",
    "page": "HDF5",
    "title": "Examples",
    "category": "section",
    "text": "A table \"daqdata\" with columns for channel number, unix-time, event type, veto and waveform will be written to an HDF5 file like this:GROUP \"daqdata\" {\n    ATTRIBUTE \"datatype\" = \"table{ch,unixtime,evttype,veto,waveform}\"\n    DATASET \"ch\" {\n        ATTRIBUTE \"datatype\" = \"array<1>{real}\"\n        DATA = [1, 3, 2, 4, ...]\n    }\n    DATASET \"unixtime\" {\n        ATTRIBUTE \"datatype\" = \"array<1>{real}\"\n        DATA = [1.44061e+09, 1.44061e+09, ...]\n    }\n    DATASET \"evttype\" {\n        ATTRIBUTE \"datatype\" = \"array<1>{enum{evt_undef=0,evt_real=1,evt_pulser=2,evt_mc=3,evt_baseline=4}}\"\n        DATA = [1, 2, 1, 1, ...]\n    }\n    DATASET \"veto\" {\n        DATA = [1, 1, 0, 0, ...]\n        ATTRIBUTE \"datatype\" = \"array<1>{bool}\"\n        DATA = [1, 1, 0, 0, ...]\n    }\n    GROUP \"waveform\" {\n        ATTRIBUTE \"datatype\" = \"table{t0,dt,values}\"\n        DATASET \"dt\" {\n            ATTRIBUTE \"datatype\"= \"array<1>{real}\"\n            ATTRIBUTE \"units\"= \"ns\"\n            DATA = [10, 10, 10, ...]\n        }\n        DATASET \"t0\" {\n            ATTRIBUTE \"datatype\"= \"array<1>{real}\"\n            ATTRIBUTE \"units\"= \"ns\"\n            DATA = [76420, 76420, 76420, ...]\n        }\n        GROUP \"values\" {\n            ATTRIBUTE \"datatype\"= \"array<1>{array<1>{real}}\"\n            DATASET \"cumulative_length\" {\n                ATTRIBUTE \"datatype\" = \"array<1>{real}\"\n                DATA = [1000, 2000, 3000, 4000, ...]\n            }\n            DATASET \"flattened_data\" {\n                ATTRIBUTE \"datatype\" = \"array<1>{real}\"\n                DATA = [14440, 14442, 14441, 14434, ...]\n            }\n        }\n    }\n}The actual numeric types of the datasets will be application-dependent.A 1-dimensional histogram will be written asGROUP \"hist_1d\" {\n    ATTRIBUTE \"datatype\" = \"struct{binning,weights,isdensity}\"\n    GROUP \"binning\" {\n        ATTRIBUTE \"datatype\" = \"struct{axis_1}\"\n        GROUP \"axis_1\" {\n            ATTRIBUTE \"datatype\" = \"struct{binedges,closedleft}\"\n            GROUP \"binedges\" {\n                ATTRIBUTE \"datatype\" = \"struct{first,last,step}\"\n                DATASET \"first\" {\n                    ATTRIBUTE \"datatype\" = \"real\"\n                    DATA = 0\n                }\n                DATASET \"last\" {\n                    ATTRIBUTE \"datatype\" = \"real\"\n                    DATA = 3000\n                }\n                DATASET \"step\" {\n                    ATTRIBUTE \"datatype\" = \"real\"\n                    DATA = 1\n                }\n            }\n            DATASET \"closedleft\" {\n                ATTRIBUTE \"datatype\" = \"bool\"\n                DATA = 1\n            }\n        }\n    }\n    DATASET \"isdensity\" {\n        ATTRIBUTE \"datatype\" = \"bool\"\n        DATA = 0\n    }\n    DATASET \"weights\" {\n        ATTRIBUTE \"datatype\" = \"array<1>{real}\"\n        DATA = [...]\n    }\n}Multi-dimensional histograms will have groups \"axis_2\", etc., with a multi-dimensional array as the value of dataset \"weights\"."
},

{
    "location": "data_compression/#",
    "page": "Data Compression",
    "title": "Data Compression",
    "category": "page",
    "text": ""
},

{
    "location": "data_compression/#Data-Compression-1",
    "page": "Data Compression",
    "title": "Data Compression",
    "category": "section",
    "text": "In addition to compression features provided by standard data formats (HDF5, etc.), LEGEND data uses some custom data compression.In the interest of long-term data accessibility and to ensure compliance with FAIR data principles, use of custom data compression methods has to be limited to a minimum number of methods and use cases. Long-term use is only acceptable if:The custom compression significantly outperforms standard compression methods in compression ratio and/or (de-)compression speed for important use cases.\nA complete formal description of the algorithms exists and is made publicly available under a license that allows for independent third-party implementations.\nVerified implementations exist in a least two different programming languages, at least one of which has been implemented independently from the formal description of the algorithm and at least one of which is made publicly available under an open-source license."
},

{
    "location": "data_compression/#Lossless-compression-of-integer-valued-waveform-vectors-1",
    "page": "Data Compression",
    "title": "Lossless compression of integer-valued waveform vectors",
    "category": "section",
    "text": "As detector waveforms have specific shapes, custom compression algorithms optimized for this use case can show a much higher speed/throughput than generic compression algorithms, at similar compression ratios.Currently, we use the following custom integer-waveform compression algorithms:radware-sigcompress v1.0Other compression algorithms are being developed, tested and evaluated.Note: The algorithm(s) in use are still subject to change, long-term data compatibility is not guaranteed at this point."
},

{
    "location": "data_compression/#radware-sigcompress-1",
    "page": "Data Compression",
    "title": "radware-sigcompress",
    "category": "section",
    "text": "There is no formal description of the radware-sigcompress algorithm yet, so the C-code of the original implementation (\"sigcompress.c\") will serve as the reference for now:// radware-sigcompress, v1.0\n//\n// This code is licensed under the MIT License (MIT).\n// Copyright (c) 2018, David C. Radford <radforddc@ornl.gov>\n\nint compress_signal(short *sig_in, unsigned short *sig_out, int sig_len_in) {\n\n  int   i, j, max1, max2, min1, min2, ds, nb1, nb2;\n  int   iso, nw, bp, dd1, dd2;\n  unsigned short db[2];\n  unsigned int   *dd = (unsigned int *) db;\n  static unsigned short mask[17] = {0, 1,3,7,15, 31,63,127,255,\n                                    511,1023,2047,4095, 8191,16383,32767,65535};\n\n  //static int len[17] = {4096, 2048,512,256,128, 128,128,128,128,\n  //                      128,128,128,128, 48,48,48,48};\n  /* ------------ do compression of signal ------------ */\n  j = iso = bp = 0;\n\n  sig_out[iso++] = sig_len_in;     // signal length\n  while (j < sig_len_in) {         // j = starting index of section of signal\n    // find optimal method and length for compression of next section of signal \n    max1 = min1 = sig_in[j];\n    max2 = -16000;\n    min2 = 16000;\n    nb1 = nb2 = 2;\n    nw = 1;\n    for (i=j+1; i < sig_len_in && i < j+48; i++) { // FIXME; # 48 could be tuned better?\n      if (max1 < sig_in[i]) max1 = sig_in[i];\n      if (min1 > sig_in[i]) min1 = sig_in[i];\n      ds = sig_in[i] - sig_in[i-1];\n      if (max2 < ds) max2 = ds;\n      if (min2 > ds) min2 = ds;\n        nw++;\n    }\n    if (max1-min1 <= max2-min2) { // use absolute values\n      nb2 = 99;\n      while (max1 - min1 > mask[nb1]) nb1++;\n      //for (; i < sig_len_in && i < j+len[nb1]; i++) {\n      for (; i < sig_len_in && i < j+128; i++) { // FIXME; # 128 could be tuned better?\n        if (max1 < sig_in[i]) max1 = sig_in[i];\n        dd1 = max1 - min1;\n        if (min1 > sig_in[i]) dd1 = max1 - sig_in[i];\n        if (dd1 > mask[nb1]) break;\n        if (min1 > sig_in[i]) min1 = sig_in[i];\n        nw++;\n      }\n    } else {                      // use difference values\n      nb1 = 99;\n      while (max2 - min2 > mask[nb2]) nb2++;\n      //for (; i < sig_len_in && i < j+len[nb1]; i++) {\n      for (; i < sig_len_in && i < j+128; i++) { // FIXME; # 128 could be tuned better?\n        ds = sig_in[i] - sig_in[i-1];\n        if (max2 < ds) max2 = ds;\n        dd2 = max2 - min2;\n        if (min2 > ds) dd2 = max2 - ds;\n        if (dd2 > mask[nb2]) break;\n        if (min2 > ds) min2 = ds;\n        nw++;\n      }\n    }\n\n    if (bp > 0) iso++;\n    /*  -----  do actual compression  -----  */\n    sig_out[iso++] = nw;  // compressed signal data, first byte = # samples\n    bp = 0;               // bit pointer\n    if (nb1 <= nb2) {\n      /*  -----  encode absolute values  -----  */\n      sig_out[iso++] = nb1;                    // # bits used for encoding\n      sig_out[iso++] = (unsigned short) min1;  // min value used for encoding\n      for (i = iso; i <= iso + nw*nb1/16; i++) sig_out[i] = 0;\n      for (i = j; i < j + nw; i++) {\n        dd[0] = sig_in[i] - min1;              // value to encode\n        dd[0] = dd[0] << (32 - bp - nb1);\n        sig_out[iso] |= db[1];\n        bp += nb1;\n        if (bp > 15) {\n          sig_out[++iso] = db[0];\n          bp -= 16;\n        }\n      }\n\n    } else {\n      /*  -----  encode derivative / difference values  -----  */\n      sig_out[iso++] = nb2 + 32;  // # bits used for encoding, plus flag\n      sig_out[iso++] = (unsigned short) sig_in[j];  // starting signal value\n      sig_out[iso++] = (unsigned short) min2;       // min value used for encoding\n      for (i = iso; i <= iso + nw*nb2/16; i++) sig_out[i] = 0;\n      for (i = j+1; i < j + nw; i++) {\n        dd[0] = sig_in[i] - sig_in[i-1] - min2;     // value to encode\n        dd[0]= dd[0] << (32 - bp - nb2);\n        sig_out[iso] |= db[1];\n        bp += nb2;\n        if (bp > 15) {\n          sig_out[++iso] = db[0];\n          bp -= 16;\n        }\n      }\n    }\n    j += nw;\n  }\n\n  if (bp > 0) iso++;\n  if (iso%2) iso++;     // make sure iso is even for 4-byte padding\n  return iso;           // number of shorts in compressed signal data\n\n} /* compress_signal */\n\n\nint decompress_signal(unsigned short *sig_in, short *sig_out, int sig_len_in) {\n\n  int   i, j, min, nb, isi, iso, nw, bp, siglen;\n  unsigned short db[2];\n  unsigned int   *dd = (unsigned int *) db;\n  static unsigned short mask[17] = {0, 1,3,7,15, 31,63,127,255,\n                                    511,1023,2047,4095, 8191,16383,32767,65535};\n\n  /* ------------ do decompression of signal ------------ */\n  j = isi = iso = bp = 0;\n  siglen = (short) sig_in[isi++];  // signal length\n  //printf(\"<<< siglen = %d\\n\", siglen);\n  for (i=0; i<2048; i++) sig_out[i] = 0;\n  while (isi < sig_len_in && iso < siglen) {\n    if (bp > 0) isi++;\n    bp = 0;              // bit pointer\n    nw = sig_in[isi++];  // number of samples encoded in this chunk\n    nb = sig_in[isi++];  // number of bits used in compression\n\n    if (nb < 32) {\n      /*  -----  decode absolute values  -----  */\n      min = (short) sig_in[isi++];  // min value used for encoding\n      db[0] = sig_in[isi];\n      for (i = 0; i < nw && iso < siglen; i++) {\n        if (bp+nb > 15) {\n          bp -= 16;\n          db[1] = sig_in[isi++];\n          db[0] = sig_in[isi];\n          dd[0] = dd[0] << (bp+nb);\n        } else {\n          dd[0] = dd[0] << nb;\n        }\n        sig_out[iso++] = (db[1] & mask[nb]) + min;\n        bp += nb;\n      }\n\n    } else {\n      nb -= 32;\n      /*  -----  decode derivative / difference values  -----  */\n      sig_out[iso++] = (short) sig_in[isi++];  // starting signal value\n      min = (short) sig_in[isi++];             // min value used for encoding\n      db[0] = sig_in[isi];\n      for (i = 1; i < nw && iso < siglen; i++) {\n        if (bp+nb > 15) {\n          bp -= 16;\n          db[1] = sig_in[isi++];\n          db[0] = sig_in[isi];\n          dd[0] = dd[0] << (bp+nb);\n        } else {\n          dd[0] = dd[0] << nb;\n        }\n        sig_out[iso] = (db[1] & mask[nb]) + min + sig_out[iso-1]; iso++;\n        bp += nb;\n      }\n    }\n    j += nw;\n  }\n\n  if (siglen != iso) {\n    printf(\"ERROR in decompress_signal: iso (%d ) != siglen (%d)!\\n\",\n           iso, siglen);\n  }\n  return siglen;       // number of shorts in decompressed signal data\n\n} /* decompress_signal */"
},

{
    "location": "daq_data/#",
    "page": "DAQ Data",
    "title": "DAQ Data",
    "category": "page",
    "text": ""
},

{
    "location": "daq_data/#Low-level-DAQ-Data-Structure-1",
    "page": "DAQ Data",
    "title": "Low-level DAQ Data Structure",
    "category": "section",
    "text": ""
},

{
    "location": "daq_data/#General-DAQ-structure-1",
    "page": "DAQ Data",
    "title": "General DAQ structure",
    "category": "section",
    "text": "DAQ data is represented by a table, each row represents a DAQ event on a single (physical or logical) input channel. Event building will happen at a higher data level.The detailed structure of DAQ data will depend on the DAQ system and experimental setup. However, fields like these may become mandatory for all DAQs:ch: array<1>{real}\nevttype: array<1>{enum{evt_undef=0,evt_real=1,evt_pulser=2,evt_mc=3,evt_baseline=4}}\ndaqevtno: array<1>{real}A DAQ system with waveform digitization will provide columns likewaveform_lf: array<1>{waveform}, see below\nwaveform_hf: array<1>{waveform}, see belowIf the DAQ performs an internal pulse-shape analysis (digital or analog), energy reconstruction and other columns may be available, e.g.:psa_energy: array<1>{real}\npsa_trise: array<1>{real}Other DAQ and setup-specific columns will often be present, e.g.muveto: array<1>{real}The collaboration will decide on a list of recommended columns names, to ensure columns with same semantics will have the same name, independent of DAQ/setup.Legacy data that does not separate low-level DAQ data and event building will also include a columnevtno: array<1>{real}"
},

{
    "location": "daq_data/#Waveform-vectors-1",
    "page": "DAQ Data",
    "title": "Waveform vectors",
    "category": "section",
    "text": "Waveform data as be stored either directly in compressed form. Uncompressed waveform data is stored as a table{t0,dt,values}:t0: array<1>{real}\ndt: array<1>{real}\nEither values: array<1>{array<1>{real}} or array_of_equalsized_arrays<1,1>{real}\nor encvalues: table{bytes,... codec information ...}\nencvalues: table{bytes,... codec information ...}\n\nbytes: array<1>{array<1>{real}}\nsome_codec_information: ...Compressed waveform data is stored as a table{t0,dt,encvalues}:t0: array<1>{real}\ndt: array<1>{real}\nencvalues: table{bytes,... codec information ...}The column encvalues has the structurebytes: array<1>{array<1>{real}}\nsome_codec_information: ..."
},

]}
