<?php

namespace App\Repository;

use App\Entity\Comments;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Comments>
 *
 * @method Comments|null find($id, $lockMode = null, $lockVersion = null)
 * @method Comments|null findOneBy(array $criteria, array $orderBy = null)
 * @method Comments[]    findAll()
 * @method Comments[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CommentsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Comments::class);
    }


    public function findByMovie($imdbID): array
    {
        return $this->createQueryBuilder('c')
           ->andWhere('c.imdbID = :val')
           ->setParameter('val', $imdbID)
           ->orderBy('c.created_at', 'ASC')
           ->setMaxResults(10)
           ->getQuery()
           ->getResult()
       ;
    }
}
