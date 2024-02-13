<?php

namespace App\Form;

use App\Entity\User;
use App\Entity\Comments;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class CommentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        /**
         
        +------------+--------------+------+-----+---------+----------------+
        | Field      | Type         | Null | Key | Default | Extra          |
        +------------+--------------+------+-----+---------+----------------+
        | id         | int          | NO   | PRI | NULL    | auto_increment |
        | id_user_id | int          | YES  | MUL | NULL    |                |
        | created_at | datetime     | NO   |     | NULL    |                |
        | content    | varchar(255) | NO   |     | NULL    |                |
        | imdb_id    | varchar(16)  | NO   |     | NULL    |                |
        +------------+--------------+------+-----+---------+----------------+
 
         */
        $builder
            ->add('content', TextareaType::class, [
                'attr' => [
                    'class' => 'form-control',
                    'rows' =>"3"
                ],
                'label' => 'Commentaire',
            ]) 
            ->add('submit', SubmitType::class, [
                'attr' => [
                    'class' => 'btn btn-success mt-4'
                ],
                'label' => 'Envoyer'
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Comments::class,
        ]);
    }
}
