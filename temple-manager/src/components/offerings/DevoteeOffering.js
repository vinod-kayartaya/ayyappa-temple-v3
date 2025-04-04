import React, { useState, useEffect, useRef } from 'react';
import {
  getDevoteeNames,
  getVazhipaduByCode,
  createDevoteeOffering,
  updateDevoteeOffering,
  fetchDeities,
  printBill,
} from '../../services/api';

const NAKSHATHRAS = [
  'Ashwini',
  'Bharani',
  'Krithika',
  'Rohini',
  'Mrigashira',
  'Ardra',
  'Punarvasu',
  'Pushya',
  'Ashlesha',
  'Magha',
  'Purva Phalguni',
  'Uttara Phalguni',
  'Hasta',
  'Chitra',
  'Swati',
  'Vishakha',
  'Anuradha',
  'Jyeshtha',
  'Mula',
  'Purva Ashadha',
  'Uttara Ashadha',
  'Shravana',
  'Dhanishta',
  'Shatabhisha',
  'Purva Bhadrapada',
  'Uttara Bhadrapada',
  'Revati',
];

function DevoteeOffering({ offering, onSubmit, onCancel }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [devoteeNames, setDevoteeNames] = useState([]);
  const [offeringRows, setOfferingRows] = useState([]);
  const [deities, setDeities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [shouldPrint, setShouldPrint] = useState(true);
  const [printLoading, setPrintLoading] = useState(false);
  const vazhipaduInputRefs = useRef({});
  const [offeringDate, setOfferingDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  // Add refs for name and nos inputs
  const nameInputRefs = useRef({});
  const nosInputRefs = useRef({});

  // Initialize form with offering data if editing
  useEffect(() => {
    if (offering) {
      setPhoneNumber(offering.items[0]?.devoteeMobileNumber || '');
      setOfferingDate(offering.offeringDate);
      
      // Convert offering items to row format
      const rows = offering.items.map(item => ({
        id: item.id || Date.now(),
        devoteeName: item.devoteeName || '',
        nakshatra: item.devoteeNakshtram || '',
        vazhipaduCode: item.vazhipaduCode || '',  // Use vazhipadu code
        vazhipaduId: item.vazhipaduId,
        vazhipaduName: item.vazhipaduName || '',
        deityName: item.deityName || '',
        nos: item.nos || 1,
        rate: item.amount / (item.nos || 1),
      }));
      
      setOfferingRows(rows);
    }
  }, [offering]);

  useEffect(() => {
    const loadDeities = async () => {
      try {
        const data = await fetchDeities();
        setDeities(data);
      } catch (err) {
        console.error('Failed to load deities:', err);
        setError('Failed to load deities');
      }
    };
    loadDeities();
  }, []);

  const handlePhoneNumberSubmit = async (e) => {
    if (e.key === 'Enter') {
      try {
        setLoading(true);
        const devotees = await getDevoteeNames(phoneNumber);
        setDevoteeNames(devotees);
      } catch (err) {
        setError('Failed to fetch devotee names');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDevoteeSelect = (devotee) => {
    const newRowId = Date.now();
    addOfferingRow(devotee, newRowId);

    setTimeout(() => {
      if (vazhipaduInputRefs.current[newRowId]) {
        vazhipaduInputRefs.current[newRowId].focus();
      }
    }, 0);
  };

  const addOfferingRow = (devotee = null, rowId = Date.now()) => {
    setOfferingRows((prev) => [
      ...prev,
      {
        id: rowId,
        devoteeName: devotee ? devotee.devoteeName : '',
        nakshatra: devotee ? devotee.devoteeNakshtram : '',
        vazhipaduCode: '',
        vazhipaduId: null,
        vazhipaduName: '',
        deityName: '',
        nos: 1,
        rate: 0,
      },
    ]);

    // Add focus after a short delay to ensure the input is rendered
    setTimeout(() => {
      if (vazhipaduInputRefs.current[rowId]) {
        vazhipaduInputRefs.current[rowId].focus();
      }
    }, 0);
  };

  const handleVazhipaduCodeSubmit = async (e, rowId) => {
    if (e.key === 'Enter') {
      try {
        const vazhipadu = await getVazhipaduByCode(e.target.value);
        setOfferingRows((prev) =>
          prev.map((row) => {
            if (row.id === rowId) {
              return {
                ...row,
                vazhipaduCode: vazhipadu.code,
                vazhipaduId: vazhipadu.id,
                vazhipaduName: vazhipadu.vazhipaduName,
                rate: vazhipadu.amount,
              };
            }
            return row;
          })
        );

        // Find the current row
        const currentRow = offeringRows.find(row => row.id === rowId);
        
        // After a short delay to ensure state is updated
        setTimeout(() => {
          if (currentRow) {
            if (!currentRow.devoteeName) {
              // If name is empty, focus the name input
              nameInputRefs.current[rowId]?.focus();
            } else if (!currentRow.nakshatra) {
              // If nakshatra is empty, focus the nakshatra select
              // Note: Select elements can't be focused programmatically in some browsers
            } else {
              // If both name and nakshatra are filled, focus the nos input
              nosInputRefs.current[rowId]?.focus();
            }
          }
        }, 0);
      } catch (err) {
        setError('Failed to fetch vazhipadu details');
      }
    }
  };

  const handlePrint = async (offeringData) => {
    try {
      setPrintLoading(true);
      await printBill(offeringData);
      setSuccessMessage(prev => prev + ' Receipt printed successfully.');
    } catch (err) {
      console.error('Print error:', err);
      setError('Failed to print receipt');
    } finally {
      setPrintLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Validate all fields are filled
      const invalidRows = offeringRows.filter(
        row => !row.vazhipaduId || !row.devoteeName || !row.nakshatra || !row.deityName
      );

      if (invalidRows.length > 0) {
        setError('Please fill all mandatory fields in all rows');
        return;
      }

      setLoading(true);
      setError('');
      setSuccessMessage('');

      const offeringData = {
        transactionDate: new Date().toISOString().split('T')[0],
        offeringDate: offeringDate,
        items: offeringRows.map((row) => ({
          devoteeMobileNumber: phoneNumber,
          vazhipaduId: row.vazhipaduId,
          devoteeName: row.devoteeName,
          devoteeNakshtram: row.nakshatra,
          deityName: row.deityName,
          nos: row.nos,
          amount: row.rate * row.nos,
          vazhipaduName: row.vazhipaduName,
          vazhipaduCode: row.vazhipaduCode,
        })),
      };

      let response;
      if (offering) {
        response = await updateDevoteeOffering(offering.id, offeringData);
      } else {
        response = await createDevoteeOffering(offeringData);
        if (shouldPrint) {
          await handlePrint(response);
        }
      }

      if (response) {
        setSuccessMessage(offering ? 'Offering updated successfully' : 'Offering saved successfully');
        
        if (onSubmit) {
          onSubmit(response);
        } else {
          setOfferingRows([]);
          setPhoneNumber('');
          setDevoteeNames([]);
          setError('');
        }

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (err) {
      console.error('Save error:', err);
      setError(err.message || 'Failed to save offering');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  // Add function to calculate total amount
  const calculateTotal = () => {
    return offeringRows.reduce((sum, row) => sum + (row.nos * row.rate), 0);
  };

  return (
    <div className={!offering ? 'container' : undefined}>
      {error && (
        <div className='alert alert-danger' role='alert'>
          {error}
        </div>
      )}

      {successMessage && (
        <div className='alert alert-success' role='alert'>
          {successMessage}
        </div>
      )}

      {!offering && <h5 className='mb-4'>Record Offering</h5>}
      
      {offering && (
        <div className='mb-4'>
          <h6 className='text-muted'>Bill #{String(offering.id).padStart(6, '0')}</h6>
        </div>
      )}

      <div className='row'>
        <div className='col-md-4'>
          <div className='mb-3'>
            <label className='form-label'>Mobile number:</label>
            <input
              type='text'
              className='form-control'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onKeyPress={handlePhoneNumberSubmit}
              placeholder='Enter phone number and press Enter'
              autoFocus={!offering}
            />
          </div>

          <div className='mb-4'>
            <label className='form-label'>Offering Date:</label>
            <input
              type='date'
              className='form-control'
              value={offeringDate}
              onChange={(e) => setOfferingDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {devoteeNames.length > 0 && (
          <div className='col-md-8'>
            <label className='form-label'>Add Devotee:</label>
            <div>
              {devoteeNames.map((devotee) => (
                <button
                  key={devotee.devoteeName}
                  type="button"
                  className='btn btn-outline-secondary me-2 mb-2'
                  onClick={() => handleDevoteeSelect(devotee)}
                >
                  <i className='bi bi-plus-lg me-1'></i>
                  {devotee.devoteeName}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='table-responsive'>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Vazhipadu code*</th>
              <th>Vazhipadu name</th>
              <th>Name*</th>
              <th>Star*</th>
              <th>Deity*</th>
              <th>Nos</th>
              <th>Rate</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {offeringRows.map((row) => (
              <tr key={row.id}>
                <td>
                  <input
                    ref={(el) => (vazhipaduInputRefs.current[row.id] = el)}
                    type='text'
                    className='form-control'
                    value={row.vazhipaduCode}
                    onChange={(e) => {
                      setOfferingRows((prev) =>
                        prev.map((r) =>
                          r.id === row.id
                            ? { ...r, vazhipaduCode: e.target.value }
                            : r
                        )
                      );
                    }}
                    onKeyPress={(e) => handleVazhipaduCodeSubmit(e, row.id)}
                  />
                </td>
                <td>
                  <input
                    type='text'
                    className='form-control'
                    value={row.vazhipaduName}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type='text'
                    className='form-control'
                    value={row.devoteeName}
                    ref={el => nameInputRefs.current[row.id] = el}
                    onChange={(e) => {
                      setOfferingRows((prev) =>
                        prev.map((r) =>
                          r.id === row.id
                            ? { ...r, devoteeName: e.target.value }
                            : r
                        )
                      );
                    }}
                  />
                </td>
                <td>
                  <select
                    className='form-select'
                    value={row.nakshatra}
                    onChange={(e) => {
                      setOfferingRows((prev) =>
                        prev.map((r) =>
                          r.id === row.id
                            ? { ...r, nakshatra: e.target.value }
                            : r
                        )
                      );
                    }}
                  >
                    <option value=''>Select Star</option>
                    {NAKSHATHRAS.map((nakshatra) => (
                      <option key={nakshatra} value={nakshatra}>
                        {nakshatra}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    className='form-select'
                    value={row.deityName}
                    onChange={(e) => {
                      setOfferingRows((prev) =>
                        prev.map((r) =>
                          r.id === row.id
                            ? { ...r, deityName: e.target.value }
                            : r
                        )
                      );
                    }}
                  >
                    <option value=''>Select Deity</option>
                    {deities.map((deity) => (
                      <option key={deity.id} value={deity.name}>
                        {deity.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type='number'
                    className='form-control'
                    value={row.nos}
                    ref={el => nosInputRefs.current[row.id] = el}
                    onChange={(e) => {
                      setOfferingRows((prev) =>
                        prev.map((r) =>
                          r.id === row.id
                            ? { ...r, nos: parseInt(e.target.value) || 1 }
                            : r
                        )
                      );
                    }}
                    min='1'
                  />
                </td>
                <td>
                  <input
                    type='number'
                    className='form-control'
                    value={row.rate}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type='number'
                    className='form-control'
                    value={row.nos * row.rate}
                    readOnly
                  />
                </td>
                <td className="align-middle">
                  <button 
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      setOfferingRows(prev => prev.filter(r => r.id !== row.id));
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='d-flex justify-content-between align-items-center mt-3'>
        <div className='d-flex align-items-center gap-3'>
          <button
            className='btn btn-secondary'
            onClick={() => addOfferingRow()}
            disabled={loading}
          >
            + Add New
          </button>
          
          {!offering && (
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="printReceipt"
                checked={shouldPrint}
                onChange={(e) => setShouldPrint(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="printReceipt">
                Print receipt
              </label>
            </div>
          )}
        </div>

        <div className='text-end'>
          <div className='h5 mb-3'>
            Total Amount: ₹{calculateTotal()}
          </div>
          <div className="d-flex gap-2 justify-content-end">
            {offering && (
              <button
                type="button"
                className='btn btn-info'
                onClick={() => handlePrint(offering)}
                disabled={printLoading}
              >
                {printLoading ? (
                  <>
                    <span
                      className='spinner-border spinner-border-sm me-2'
                      role='status'
                      aria-hidden='true'
                    ></span>
                    Printing...
                  </>
                ) : (
                  'Print Receipt'
                )}
              </button>
            )}
            
            {onCancel && (
              <button
                type="button"
                className='btn btn-secondary'
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </button>
            )}
            <button
              className='btn btn-primary'
              onClick={handleSave}
              disabled={loading || offeringRows.length === 0}
            >
              {loading ? (
                <>
                  <span
                    className='spinner-border spinner-border-sm me-2'
                    role='status'
                    aria-hidden='true'
                  ></span>
                  {offering ? 'Updating...' : 'Saving...'}
                </>
              ) : (
                offering ? 'Update' : 'Save'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevoteeOffering;
