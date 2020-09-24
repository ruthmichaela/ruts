with import <nixpkgs> {};
stdenv.mkDerivation rec {
	name = "Ruts";
	env = buildEnv { name = name; paths = buildInputs; };
	
	buildInputs = [
		hugo
	];
}

