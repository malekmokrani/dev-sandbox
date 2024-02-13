<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Validator\Constraints;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;

class RegisterType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
       

        $builder
            ->add('email', TextType::class, [
                'attr' => [
                    'class' => 'form-control',
                    'maxlength' => '180',
                    'placeholder' => 'Email',
                    'type' => 'email'
                ],
                'label' => 'Adresse Email',
                'constraints' => [
                    new Constraints\NotBlank(),
                    new Constraints\Email(),
                    new Constraints\Length(['min' => 5, 'max' => 180])
                ]

            ])
            ->add('password', RepeatedType::class, [
                'type' => PasswordType::class,
                'first_options' => [
                    'attr' => [
                        'class' => 'form-control'
                    ],
                    'label' => 'Mot de passe',
                    'label_attr' => [
                        'class' => 'form-label  mt-4'
                    ]
                ],
                'second_options' => [
                    'attr' => [
                        'class' => 'form-control'
                    ],
                    'label' => 'Confirmation du mot de passe',
                    'label_attr' => [
                        'class' => 'form-label  mt-4'
                    ]
                ],
                'invalid_message' => 'Les mots de passe doivent être identique.'
            ])

            ->add('submit', SubmitType::class, [
                'attr' => [
                    'class' => 'btn btn-success mt-4'
                ],
                'label' => 'Créer mon compte'
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
