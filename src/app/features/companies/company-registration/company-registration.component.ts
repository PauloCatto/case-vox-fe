import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.scss',
})
export class CompanyRegistrationComponent {
  cadastroForm!: FormGroup;

  entidadesRegistro = ['Cartório', 'Junta Comercial', 'OAB', 'RFB'];
  estados = ['SP', 'RJ', 'MG', 'RS', 'PR'];

  isEditMode: boolean = false;
  currentId: string | null = null;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  initializeForm(): void {
    this.cadastroForm = this.fb.group({
      responsavel: ['', Validators.required],
      cpf: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
        ],
      ],
      dataNascimento: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      entidadeRegistro: ['', Validators.required],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      endereco: ['', Validators.required],
      bairro: ['', Validators.required],
      complemento: [''],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  checkEditMode(): void {
    this.currentId = this.route.snapshot.paramMap.get('id');
    if (this.currentId) {
      this.isEditMode = true;
      this.loadData(this.currentId);
    }
  }

  loadData(id: string): void {
    const mockData = {
      responsavel: 'João Silva',
      cpf: '123.456.789-00',
      dataNascimento: '1990-01-01',
      nomeFantasia: 'Empresa Exemplo',
      entidadeRegistro: 'Junta Comercial',
      cep: '12345-678',
      endereco: 'Rua A, 123',
      bairro: 'Centro',
      complemento: 'Sala 1',
      cidade: 'São Paulo',
      estado: 'SP',
    };

    this.cadastroForm.patchValue(mockData);
  }

  submitForm(): void {
    if (this.cadastroForm.valid) {
      if (this.isEditMode) {
        this.updateEntry();
      } else {
        this.createEntry();
      }
    } else {
      this.cadastroForm.markAllAsTouched();
      alert('Please fill in all required fields correctly!');
    }
  }

  createEntry(): void {
    console.log('Creating new entry:', this.cadastroForm.value);
    alert('Entry successfully created!');
    this.router.navigate(['/']);
  }

  updateEntry(): void {
    console.log('Updating entry id', this.currentId, this.cadastroForm.value);
    alert('Entry successfully updated!');
    this.router.navigate(['/']);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
