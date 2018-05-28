export class Disciplina {
    private Matricula: String;
    private CodTurma: String;
    private Nome: String;
    private Disciplina: String;

    construtor() {
    }

	public get $Matricula(): String {
		return this.Matricula;
	}

	public set $Matricula(value: String) {
		this.Matricula = value;
	}
    

	public get $Nome(): String {
		return this.Nome;
	}

	public set $Nome(value: String) {
		this.Nome = value;
	}
    

	public get $Disciplina(): String {
		return this.Disciplina;
	}

	public set $Disciplina(value: String) {
		this.Disciplina = value;
	}
    

	public get $CodTurma(): String {
		return this.CodTurma;
	}

	public set $CodTurma(value: String) {
		this.CodTurma = value;
	}
    
    
}