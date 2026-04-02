import React from 'react'

export default function UserCard() {
  return (
 <div key={user._id} className="flex justify-between items-center gap-4 bg-white w-full p-2 border-t border-b border-gray-200 h-20">
                <div className='flex justify-start items-center gap-4'>
                  <Link href={`/${lang}/profile/${user.name}`} className="flex justify-start items-center gap-2 w-50">
                    <AvatarBlock avatar={user.avatar} size="45"/>
                    <span key={user._id}>{user.name}</span>
                  </Link>
                  <span className='text-sm text-gray-500'>Баланс: <br /> <span className='text-orange-600'>{user.balance} ₴</span></span>
                </div>
                <div className={`justify-start items-center gap-4 ${user._id === balanceEdit ? 'hidden' : 'flex'}`}>
                  <button onClick={() => setBalanceEdit(user._id)} className={`${hover} rounded-md !p-2 bg-gray-100`}>{t('admin', 'balance')}</button>
                  <button className={`${user.status === 'Blocked' ? 'bg-green-500' : 'bg-red-500'} ${hover} p-2 text-white rounded-md`} onClick={() => handleChangeStatus(user._id)}>{user.status === 'Blocked' ? t('admin', 'UnBlocked') : t('admin', 'Blocked')}</button>
                  <button className={`${hover}`} onClick={() => {setId(user._id), setEdit(true)}}>{t('admin', 'edit')}</button>
                  <span className={`${hover} text-red-500`} onClick={() => setOpenConfirm(true)}>{t('admin', 'delete')}</span>
                </div>
                <div className={`justify-start items-center gap-4 ${user._id === balanceEdit ? 'flex' : 'hidden'}`}>
                  <input type="number" className='outline-none border border-gray-300 rounded-md p-2' 
                  defaultValue={user.balance} 
                  value={newBalance}
                  onChange={(e) => setNewBalance(Number(e.target.value))} />
                  <button onClick={() => handleUpdateBalance(user._id)} className={`${hover} bg-gray-100 rounded-md !p-2`}>{t('admin', 'saveBalance')}</button>
                  <X className={hover} onClick={() => setBalanceEdit('')}/>
                </div>
              </div>
  )
}
